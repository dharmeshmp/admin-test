import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AdminSharedModule } from 'app/shared/shared.module';
import { AdminCoreModule } from 'app/core/core.module';
import { AdminAppRoutingModule } from './app-routing.module';
import { AdminHomeModule } from './home/home.module';
import { AdminEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AdminSharedModule,
    AdminCoreModule,
    AdminHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AdminEntityModule,
    AdminAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class AdminAppModule {}
