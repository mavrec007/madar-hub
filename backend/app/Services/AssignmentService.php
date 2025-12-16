<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\AssignmentUpdatedNotification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class AssignmentService
{
    public const CONTEXT_ROLES = [
        'contracts'       => ['admin', 'manager', 'lawyer', 'user'],
        'investigations'  => ['legal_investigator', 'lawyer'],
        'procedures'      => ['legal_investigator', 'lawyer'],
        'legal_advice'    => ['legal_investigator', 'lawyer'],
        'sessions'        => ['lawyer'],
    ];

    public static function validateAssignee(?int $userId, string $context): ?User
    {
        if ($userId === null) {
            return null;
        }

        $allowedRoles = Arr::get(self::CONTEXT_ROLES, $context, []);
        $user = User::findOrFail($userId);

        if (!$user->hasAnyRole($allowedRoles)) {
            abort(422, 'User is not eligible for this assignment');
        }

        return $user;
    }

    public static function apply(Model $entity, ?int $assignedToId, string $context, string $titleField = 'id'): void
    {
        $currentAssignee = $entity->assigned_to_user_id;

        // ✅ لو ما تغيّر الإسناد، لا تعمل شيء
        if ($assignedToId === $currentAssignee) {
            return;
        }

        // ✅ تحقق من صلاحية المُسند إليه (null = فك الإسناد)
        $assignee = $assignedToId ? self::validateAssignee($assignedToId, $context) : null;

        // ✅ من قام بالإسناد (fallback لو auth غير متاح)
        $assignedBy = auth()->id() ?? $entity->assigned_by_user_id;

        // ✅ تحديث الإسناد
        $entity->forceFill([
            'assigned_to_user_id' => $assignedToId,
            'assigned_by_user_id' => $assignedBy,
        ])->save();

        // ✅ إذا تم فك الإسناد لا ترسل إشعار
        if (!$assignee) {
            return;
        }

        // (اختياري) لا ترسل إشعار لو الشخص أسند لنفسه
        // if ($assignee->id === $assignedBy) return;

        $title = (string) (data_get($entity, $titleField) ?? class_basename($entity));
        $link  = self::makeLink($context, (int) $entity->id);

        // ✅ إشعار فوري (database + broadcast) للمُسند إليه فقط
        $assignee->notify(new AssignmentUpdatedNotification(
            context: $context,
            entityTitle: $title,
            link: $link,
            entityId: (int) $entity->id,
            entityType: get_class($entity),
            assignedBy: $assignedBy,
        ));
    }

    private static function makeLink(string $context, int $id): ?string
    {
        return match ($context) {
            'contracts'       => "/contracts/{$id}",
            'investigations'  => "/investigations/{$id}",
            'procedures'      => "/procedures/{$id}",
            'legal_advice'    => "/legal-advice/{$id}",
            'sessions'        => "/sessions/{$id}",
            default           => null,
        };
    }
}