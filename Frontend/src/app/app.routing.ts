import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { HomeComponent } from './home/home.component'
import { InputArticleComponent } from './input-article/input-article.component'
import { SelectAnimationComponent } from './select-animation/select-animation.component'
import { ResultComponent } from './result/result.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'input-article', component: InputArticleComponent },
  { path: 'select-animation', component: SelectAnimationComponent },
  { path: 'result', component: ResultComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
