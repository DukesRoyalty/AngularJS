import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartistModule } from 'ng-chartist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './component/settings/settings.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { IconButtonComponent } from './component/icon-button/icon-button.component';
import { TaskGroupsComponent } from './component/task-groups/task-groups.component';
import { ChangeLogsComponent } from './component/change-logs/change-logs.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SvgComponent } from './component/svg/svg.component';
import { HttpClientModule } from '@angular/common/http';
import { TabComponent } from './component/tab/tab.component';
import { ShippingFormComponent } from './component/shipping-form/shipping-form.component';
import { BillingFormComponent } from './component/billing-form/billing-form.component';
import { PaymentFormComponent } from './component/payment-form/payment-form.component';
import { ToggleButtonComponent } from './component/toggle-button/toggle-button.component';
import { NavButtonComponent } from './component/nav-button/nav-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationWarningComponent } from './component/form-validation-warning/form-validation-warning.component';
import { CreditCardComponent } from './component/credit-card/credit-card.component';
import { ProxyComponent } from './component/proxy/proxy.component';
import { IconComponent } from './component/icon/icon.component';
import { ChangelogComponent } from './component/changelog/changelog.component';
import { PopupComponent } from './component/popup/popup.component';
import { GraphComponent } from './component/graph/graph.component';
import { StatusComponent } from './component/status/status.component';
import { NgxElectronModule } from 'ngx-electron';
import { RecentPurchaseComponent } from './component/recent-purchase/recent-purchase.component';
import { QuickCreateComponent } from './component/quick-create/quick-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    NavigationComponent,
    AnalyticsComponent,
    IconButtonComponent,
    TaskGroupsComponent,
    ChangeLogsComponent,
    ProfileComponent,
    SvgComponent,
    TabComponent,
    ShippingFormComponent,
    BillingFormComponent,
    PaymentFormComponent,
    ToggleButtonComponent,
    NavButtonComponent,
    FormValidationWarningComponent,
    CreditCardComponent,
    ProxyComponent,
    IconComponent,
    ChangelogComponent,
    PopupComponent,
    GraphComponent,
    StatusComponent,
    RecentPurchaseComponent,
    QuickCreateComponent
  ],
  imports: [
    BrowserModule,
    ChartistModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
