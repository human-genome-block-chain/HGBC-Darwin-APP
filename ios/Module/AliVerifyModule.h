//
//  AliVerifyModule.h
//  App
//
//  Created by renhanyi on 2018/12/26.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <MSAuthSDK/MSAuthVCFactory.h>
#import <SecurityGuardSDK/Open/OpenSecurityGuardManager.h>
#import <SecurityGuardSDK/Open/OpenSecurityBody/IOpenSecurityBodyComponent.h>
#import <SecurityGuardSDK/Open/OpenSecurityBody/OpenSecurityBodyDefine.h>
#import <SecurityGuardSDK/Open/OpenSecurityBody/IOpenSecurityBodyComponent.h>


NS_ASSUME_NONNULL_BEGIN

@interface AliVerifyModule : NSObject<RCTBridgeModule,MSAuthProtocol>

@end

NS_ASSUME_NONNULL_END
