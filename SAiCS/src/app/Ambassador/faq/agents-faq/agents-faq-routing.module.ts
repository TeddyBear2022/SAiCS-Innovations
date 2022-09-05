import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentsFaqPage } from './agents-faq.page';

const routes: Routes = [
  {
    path: '',
    component: AgentsFaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsFaqPageRoutingModule {}
