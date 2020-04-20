
import { Injectable } from"@angular/core";  
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild ,UrlTree} from"@angular/router";  
import { AdalService } from"adal-angular4";
import{Observable} from'rxjs'

@Injectable()  
export class AuthenticationGuard implements CanActivateChild
{  

constructor(private authService: AdalService)
{
 
}  
 
canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree
{
return this.authService.userInfo.authenticated;
}
}  

