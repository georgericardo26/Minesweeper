from rest_framework import permissions

class MineSweeperUpdatePermission(permissions.BasePermission):
    message = 'The time has been expired'

    def has_permission(self, request, view):
        return True
    
    def has_object_permission(self, request, view, obj):
        return not obj.is_expired