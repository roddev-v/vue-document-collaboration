import { NotificationsService } from "@/services/notifications.service";
import { Store } from "@/types/store";
import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notificationsStore", {
  state: (): Store.Notifications => ({ notifications: [], readNotifications: [] }),
  getters: {
    hasUnread: (store) => store.notifications?.length > 0,
    read: (store) => store.readNotifications,
    unread: (store) => store.notifications,
  },
  actions: {
    async getUnread() {
      this.notifications = await NotificationsService.genUnread();
    },
    async getRead() {
      this.readNotifications = await NotificationsService.getRead();
    },
    async markAllAsRead() {
      await NotificationsService.readAll();
      await this.getRead();
      await this.getUnread();
    }
  },
});
