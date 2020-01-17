import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: "DevRadar"
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: "Perfil no Github"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "#fff",
        headerBackTitleVisible: false, // remove o nome da página a retornar
        headerTitleAlign: "center", // android
        headerStyle: {
          backgroundColor: "#7d40e7"
        }
      }
    }
  )
);

export default Routes;
