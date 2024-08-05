import { _colorTextField } from "./Colors/color";
import { logo as _logo } from "./Icons/logo";
import { excelIcon as _excel } from "./Icons/excel";
import { customLogo as _customLogo } from "./Icons/customLogo";
import { themeColor as _themeColor } from "./Colors/themeColor";
import { formatDate as _formatDate } from "./Functions/formatDate";

export namespace Resources {
    export const version = "v1.2.1.05"
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

    export const ParameterLocalStr = {
        polyvalence_unit_table_auth: "polyvalence_unit_table_auth",
        machine_based_polyvalence_management: "machine_based_polyvalence_management",
        line_based_competency_relationship: "line_based_competency_relationship",
        polyvalence_unit_table_mail: "polyvalence_unit_table_mail",
        reminder_mail_for_unfilled_tables: "reminder_mail_for_unfilled_tables",
        competency_education_relationship: "competency_education_relationship"
    }

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
        {
            name: "Veri girişi yapılmayan tablolar için hatırlatma maili gönderilsin mi?",
            localStr: "reminder_mail_for_unfilled_tables",
            type: "boolean",
        },
        {
            name: "Yetkinlik-Eğitim İlişkisi Kurulacak mı?",
            localStr: "competency_education_relationship",
            type: "boolean",
        },
        {
            name: "Departman-Pozisyon İlişkisi Kurulacak mı?",
            localStr: "position_relation_department",
            type: "boolean",
        }
    ];

    export const StringParameters = [
        {
            name: "Birim polivalans tablosu veri sorumlularına kaç gün öncesinden mail gönderilsin?",
            localStr: "polyvalence_unit_table_responsible_users_mail_day",
            type: "string",
        },
        {
            name: "Veri girişi yapılmayan tablolar için hatırlatma maili kaç gün öncesinden gönderilsin?",
            localStr: "reminder_mail_for_unfilled_tables_day",
            type: "string",
        }
    ]

    export const Monitoring = {
        name: "Yetkinlik performansı kabul kriteri(%)?",
        localStr: "competency_performance_acceptance_criteria",
        type: "string",
    };

    export const AuthorizationProfile = [
        {
            name: "Yönetici",
            localStr: "admin",
        },
        {
            name: "Veri Girişçi",
            localStr: "responsible",
        },
        {
            name: "Görüntüleyici",
            localStr: "viewer",
        }

    ]

    export const EducationTypes = [
        {
            id: "theoreticalEducation",
            name: "Teorik Eğitim",
        },
        {
            id: "practicalEducation",
            name: "Pratik Eğitim",
        },
    ];

    export const OrganizationStructureTabValues = [
        { label: "Personeller", value: 0, link: "/app/organization-structure/employee" },
        { label: "Ünvanlar", value: 1, link: "/app/organization-structure/title" },
        { label: "Pozisyonlar", value: 2, link: "/app/organization-structure/position" },
        { label: "Hatlar", value: 3, link: "/app/organization-structure/line" },
        { label: "Departmanlar", value: 4, link: "/app/organization-structure/department" }
    ]
}