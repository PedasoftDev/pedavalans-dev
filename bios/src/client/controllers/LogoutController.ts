import { useDeleteSession } from "@realmocean/sdk";
import { Spinner, Text, UIController, UIView, VStack, useEffect, useNavigate } from "@tuval/forms";


export class LogoutController extends UIController {
    public override LoadView(): UIView {

        const { deleteSession } = useDeleteSession('console');
        const navigate = useNavigate();


        useEffect(() => {
            localStorage.removeItem('tableAuth');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('isResponsible');
            localStorage.removeItem('isViewer');
            localStorage.removeItem('polyvalence_unit_table_mail');
            localStorage.removeItem('polyvalence_unit_table_auth');
            localStorage.removeItem('line_based_competency_relationship');
            localStorage.removeItem('machine_based_polyvalence_management');

            deleteSession({ sessionId: 'current' }, () => window.location.href = '/login');
        }, []);

        return (
            VStack(
                Spinner(),
                Text('Çıkış Yapılıyor...')
            )
        )
    }
}