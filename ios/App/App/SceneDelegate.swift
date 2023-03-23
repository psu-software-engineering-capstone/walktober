import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }
        window = UIWindow(windowScene: windowScene)
        
        let launchScreenStoryboard = UIStoryboard(name: "LaunchScreen", bundle: nil)
        let launchScreenViewController = launchScreenStoryboard.instantiateInitialViewController()
        window?.rootViewController = launchScreenViewController
        window?.makeKeyAndVisible()

        // Set a delay to transition to the BridgeViewController
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            let mainStoryboard = UIStoryboard(name: "Main", bundle: nil)
            if let bridgeViewController = mainStoryboard.instantiateInitialViewController() as? CAPBridgeViewController {
                bridgeViewController.modalPresentationStyle = .fullScreen
                launchScreenViewController?.present(bridgeViewController, animated: true, completion: nil)
            }
        }
    }
}
