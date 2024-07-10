import {
  cTopLeading,
  HStack,
  UIController,
  UIRouteOutlet,
  UIScene,
  useState,
} from '@tuval/forms'
import { PortalMenu } from '../../../components/PortalMenu'

export class TrainersController extends UIController {
  public LoadView(): any {
    const [theme] = useState(JSON.parse(localStorage.getItem('pedavalans_theme')))
    return UIScene(
      HStack({ alignment: cTopLeading })(
        PortalMenu('Eğiticiler'),
        UIRouteOutlet().width('100%').height('100%')
      )
        .background(theme ? 'rgba(0,0,0,.85)' : 'white')
        .foregroundColor(theme ? 'white' : '')
    )
  }
}