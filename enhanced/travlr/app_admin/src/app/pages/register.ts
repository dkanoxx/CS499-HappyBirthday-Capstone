import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
@Component({ standalone:true, imports:[FormsModule,RouterLink], template:`
<div class="auth-page"><section class="auth-card"><div class="eyebrow">GET STARTED</div><h1>Create your account</h1><p>Remember birthdays. Make people smile.</p><form (ngSubmit)="submit()"><label>Your name<input name="name" [(ngModel)]="name" required minlength="2" maxlength="100" autocomplete="name"></label><label>Email address<input type="email" name="email" [(ngModel)]="email" required autocomplete="email"></label><label>Password <small>(12 characters minimum)</small><input type="password" name="password" [(ngModel)]="password" required minlength="12" autocomplete="new-password"></label>@if(error){<div class="alert" role="alert">{{error}}</div>}<button class="primary" type="submit" [disabled]="busy">{{busy?'Creating…':'Create account'}}</button></form><div class="below">Already have an account? <a routerLink="/login">Log in</a></div></section></div>`,styles:[`
.auth-page{display:grid;place-items:center;min-height:75vh;padding:32px 18px}.auth-card{width:min(440px,100%);background:white;border:1px solid #ebeaf3;box-shadow:0 20px 60px #24243e10;border-radius:20px;padding:38px}.eyebrow{font-size:12px;letter-spacing:2px;font-weight:800;color:#7357e8}h1{font-size:29px;margin:12px 0 8px;letter-spacing:-.7px}p{color:#777b8e;margin-bottom:26px}label{display:block;font-weight:700;font-size:14px;margin:16px 0}small{color:#888;font-weight:400}input{display:block;width:100%;box-sizing:border-box;border:1px solid #dadce7;border-radius:10px;padding:13px;margin-top:8px;font:inherit}.primary{width:100%;border:0;background:#7357e8;color:white;border-radius:10px;padding:14px;font-weight:700;cursor:pointer;margin-top:10px}.primary:disabled{opacity:.6}.below{text-align:center;margin-top:22px;color:#777b8e}.below a{color:#7357e8;font-weight:700}.alert{color:#a92f46;background:#fff0f2;padding:12px;border-radius:9px}
`]})
export class Register {
  private auth=inject(AuthService);private router=inject(Router);
  name='';email='';password='';error='';busy=false;
  submit(){this.busy=true;this.error='';this.auth.register(this.name,this.email,this.password).subscribe({next:()=>this.auth.login(this.email,this.password).subscribe({next:()=>this.router.navigate(['/dashboard']),error:()=>this.router.navigate(['/login'])}),error:e=>{this.error=e.error?.message||'Unable to register.';this.busy=false;}});}
}
