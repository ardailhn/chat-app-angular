import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent as HomeLayout } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'chat',
        loadChildren: () => import('src/app/pages/chat/chat.module').then(m => m.ChatModule)
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeLayout,HeaderComponent,FooterComponent,HomeComponent]
})
export class HomeModule { }
