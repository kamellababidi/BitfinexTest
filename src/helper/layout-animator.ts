import { Platform, LayoutAnimation, LayoutAnimationConfig } from 'react-native';

export class LayoutAnimator {

  public static animateNext(): void {
    LayoutAnimation.configureNext(platformConfig);
  }
  // ---------------------------------------------------------------------------------------
}

// Platform Configurations ------
const iosConfig: LayoutAnimationConfig = LayoutAnimation.Presets.easeInEaseOut;
const androidConfig: LayoutAnimationConfig = {
  duration: 300,
  create: {
     duration: 350,
     type: LayoutAnimation.Types.easeInEaseOut,
     property: LayoutAnimation.Properties.opacity,
  },
  update: {
     duration: 350,
     type: LayoutAnimation.Types.easeInEaseOut,
  },
 };
const platformConfig: LayoutAnimationConfig = Platform.OS === 'ios' ? iosConfig : androidConfig;
 // -----------------------------------------------------------------------------------------
