import React from 'react';
import { MENU_SIDEBAR_ITEMS } from '@/config/menu.config';
import { SidebarMenuGroup } from './SidebarMenuGroup';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarThemeSwitch } from './SidebarThemeSwitch';

interface SidebarMenuProps {
    collapsed?: boolean;
    onOpenMobileChange?: (open: boolean) => void;
    noGroups?: boolean;
}

export function SidebarMenu({ collapsed = false, onOpenMobileChange, noGroups = false }: SidebarMenuProps) {
    return (
        <nav className="px-2 pb-2 pt-1">
            <ul className="flex flex-col gap-2">
                {noGroups
                    ? MENU_SIDEBAR_ITEMS.flatMap((group) =>
                          group.items.map((item) =>
                              item.href ? (
                                  <SidebarMenuItem
                                      key={item.href}
                                      href={item.href}
                                      Icon={item.Icon}
                                      label={item.label}
                                      collapsed={collapsed}
                                      onOpenMobileChange={onOpenMobileChange}
                                  />
                              ) : null,
                          ),
                      )
                    : MENU_SIDEBAR_ITEMS.map((group) => (
                          <SidebarMenuGroup key={group.group} label={group.group} collapsed={collapsed}>
                              {group.items.map((item) =>
                                  item.href ? (
                                      <SidebarMenuItem
                                          key={item.href}
                                          href={item.href}
                                          Icon={item.Icon}
                                          label={item.label}
                                          collapsed={collapsed}
                                          onOpenMobileChange={onOpenMobileChange}
                                      />
                                  ) : null,
                              )}
                          </SidebarMenuGroup>
                      ))}
                <SidebarThemeSwitch collapsed={collapsed} />
            </ul>
        </nav>
    );
}
