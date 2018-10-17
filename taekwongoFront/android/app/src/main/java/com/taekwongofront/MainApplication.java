package com.taekwongofront;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
=======
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.rusel.RCTBluetoothSerial.RCTBluetoothSerialPackage;
import com.remobile.toast.RCTToastPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
>>>>>>> cdd923381e0deae9947a4616c2f6481259a8610e
import com.github.yamill.orientation.OrientationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
=======
			new RCTBluetoothSerialPackage(),
			new RCTToastPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
>>>>>>> cdd923381e0deae9947a4616c2f6481259a8610e
            new OrientationPackage(),
            new KCKeepAwakePackage(),
            new LinearGradientPackage(),
            new RNFetchBlobPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
