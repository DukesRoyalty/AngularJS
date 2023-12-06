import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { SettingsComponent } from './component/settings/settings.component';
import { TaskGroupsComponent } from './component/task-groups/task-groups.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProxyComponent } from './component/proxy/proxy.component';

const routes: Routes = [
  { path: '', redirectTo: '/settings', pathMatch: 'full' }, // redirect to `first-component`

  {
    path: 'settings', component: SettingsComponent
  },
  {
    path: 'analytics', component: AnalyticsComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'proxies', component: ProxyComponent
  },
  {
    path: 'task-groups', component: TaskGroupsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
