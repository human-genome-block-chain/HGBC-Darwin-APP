//
//  AliVerifyModule.m
//  App
//
//  Created by renhanyi on 2018/12/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AliVerifyModule.h"
#import "AppDelegate.h"

@interface AliVerifyModule()
@property (nonatomic,strong)RCTPromiseResolveBlock resolve;
@property (nonatomic,strong)RCTPromiseRejectBlock reject;
@property (nonatomic,strong) UIViewController   *aLiAuthVC;    //验证码vc
@end

@implementation AliVerifyModule
RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(aliVerify,
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  self.resolve = resolve;
  self.reject = reject;
  dispatch_async(dispatch_get_main_queue(), ^{
    self.aLiAuthVC = [MSAuthVCFactory simapleVerifyWithType:MSAuthTypeSlide language:@"zh_CN" Delegate:self authCode:@"0335" appKey:nil];
    
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:self.aLiAuthVC];
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    [delegate.rootViewController presentViewController:nav animated:YES completion:nil ];
  });
  
}
#pragma mark -阿里验证码回调-
- (void)verifyDidFinishedWithResult:(t_verify_reuslt)code Error:(NSError *)error SessionId:(NSString *)sessionId {
  NSLog(@"sessionId=>>>>>>>>>%@",sessionId);
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.aLiAuthVC dismissViewControllerAnimated:YES completion:^{
      NSMutableDictionary *map = [[NSMutableDictionary alloc] initWithCapacity:1];
      if (error) {
        NSLog(@"验证失败 %@", error);
        [map setObject:@"" forKey:@"sessionId"];
      } else {
        NSLog(@"验证通过 %@", sessionId);
        [map setObject:sessionId forKey:@"sessionId"];
      }
      [map setValue:@(code) forKey:@"code"];
      self.resolve(map);
    }];
  });
  
  
}

@end
