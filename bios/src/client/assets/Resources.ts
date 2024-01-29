import { _colorTextField } from "./Colors/color";
import { logo as _logo } from "./Icons/logo";
import { excelIcon as _excel } from "./Icons/excel";
import { customLogo as _customLogo } from "./Icons/customLogo";
import { themeColor as _themeColor } from "./Colors/themeColor";
import { formatDate as _formatDate } from "./Functions/formatDate";

export namespace Resources {
    export namespace Colors {
        export const colorTextField = _colorTextField;
        export const themeColor = _themeColor;
    }

    export namespace Icons {
        export const customLogo = _customLogo;
        export const logo = _logo;
        export const excel = _excel;
    }

    export namespace Functions {
        export const formatDate = _formatDate;
    }

    export const Tenants = [
        {
            id: "085b5269-d90d-40bb-a473-af43aa23c2ff",
            name: "Pedasoft"
        },
        {
            id: "3VVMPA9BMR5M", // organization structure mevcut, sıra değişmemeli
            name: "Atasan Metal"
        },
        {
            id: "33eeca89-bc3c-446f-9c7d-a00ae7ee4762",
            name: "Local Realm ID" // Eğer docker update edilirse bu id değişecektir.
        }
    ];

    export const Parameters = [
        {
            name: "Polivalans tablolarında yetkilendirme kullanılsın mı?",
            localStr: "polyvalence_unit_table_auth",
            type: "boolean",
        },
        {
            name: "Makine bazlı polivalans yönetimi uygulanacak mı?",
            localStr: "machine_based_polyvalence_management",
            type: "boolean",
        },
        {
            name: "Hat bazlı yetkinlik ilişkilendirmesi kullanılsın mı?",
            localStr: "line_based_competency_relationship",
            type: "boolean",
        },
        {
            name: "Birim polivalans tablosu veri girişleri tamamlandığı anda tüm polivalans tablosu veri girişçi ve görebilecek kişilere mail atılsın mı?",
            localStr: "polyvalence_unit_table_mail",
            type: "boolean",
        },
    ];

    export const ParameterLocalStr = {
        polyvalence_unit_table_auth: "polyvalence_unit_table_auth",
        machine_based_polyvalence_management: "machine_based_polyvalence_management",
        line_based_competency_relationship: "line_based_competency_relationship",
        polyvalence_unit_table_mail: "polyvalence_unit_table_mail",
    }

    export const Monitoring = {
        name: "Yetkinlik performansı kabul kriteri(%)?",
        localStr: "competency_performance_acceptance_criteria",
        type: "string",
    };
}