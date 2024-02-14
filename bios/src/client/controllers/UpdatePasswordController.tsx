import { Query, Services, useCreateRealm, useDeleteSession, useGetMe, useListRealms } from "@realmocean/sdk";

import { Button, ForEach, HStack, Heading, Input, TextField, Text, UINavigate, UIViewBuilder, VStack, useNavigate, useState, Spacer, cLeading, cHorizontal, darken, Icon, Icons, HDivider, UIController, UIView } from "@tuval/forms";


// if (password === password1) {
//     Services.Accounts.updateRecovery(userId, secret, password, password1);
// }


export class UpdatePasswordController extends UIController {
    public override LoadView(): UIView {

        const navigate = useNavigate();

        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const secret = params.get('secret');

        const [password, setPassword] = useState('');
        const [password1, setPassword1] = useState('');

        return (

            VStack(
                VStack(
                    VStack({ spacing: 10 })(


                        Heading('Password').fontFamily('"Hagrid", sans-serif').fontSize('6rem').foregroundColor('#090e13').lineHeight(90),
                        VStack({ alignment: cLeading, spacing: 10 })(

                            TextField().fontSize('1.8rem')
                                .allHeight(40)
                                .placeholder('New password')
                                .transition('all 0.3s ease-in-out')
                                .border('none')
                                .borderBottom({ hover: '2px solid #162330' })
                                .background('white')
                                .outline({ focus: 'none' })
                                .padding('0 1.5rem').width(332)
                                .onChange(e => setPassword(e))
                        ).height().marginBottom('1.5rem'),
                        TextField().fontSize('1.8rem')
                            .allHeight(40)
                            .placeholder('Confirm password')
                            .transition('all 0.3s ease-in-out')
                            .border('none')
                            .borderBottom({ hover: '2px solid #162330' })
                            .background('white')
                            .outline({ focus: 'none' })
                            .padding('0 1.5rem').width(332)
                            .onChange(e => setPassword1(e))
                    ).height().marginBottom('1.5rem'),
                    HStack(
                        Text('Log in with another email')
                            .fontSize(16)
                    )
                        .height()
                        .onClick(() => {
                            navigate('/logout');
                        }),
                ).width(),
                HStack().height('9rem')
                    .background('linear-gradient(0deg,#fff 42.67%,hsla(0,0%,100%,.8) 60.67%,hsla(0,0%,100%,0))')
            ).background('#7FE8D4')
        )





    }
}
