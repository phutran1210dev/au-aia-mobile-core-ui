package auaia.mobilecoreui.example

import android.annotation.SuppressLint
import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.common.assets.ReactFontManager
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    // Font families from res/font, so one fontFamily plus fontWeight picks the right file.
    ReactFontManager.getInstance().addCustomFont(this, "Open Sans", R.font.open_sans)
    registerAiaEverest()
    loadReactNative(this)
  }

  /**
   * AIA Everest is licensed and not committed. app/build.gradle generates its font resource
   * only when the files are in example/assets/fonts/AIAEverest, so look it up by name.
   */
  @SuppressLint("DiscouragedApi")
  private fun registerAiaEverest() {
    val fontId = resources.getIdentifier("aia_everest", "font", packageName)
    if (fontId != 0) {
      ReactFontManager.getInstance().addCustomFont(this, "AIA Everest", fontId)
    }
  }
}
