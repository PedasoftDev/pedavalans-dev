import IDatabase from "./IDatabase";
const Database: IDatabase = {
    "id": "pedavalans",
    "name": "Pedavalans",
    "author": "Pedasoft",
    "description": {
        "en": "Pedavalans is a database of all the pedavalans in the world.",
        "tr": "Pedavalans, projedeki tüm pedavalanların bir veritabanıdır."
    },
    seed_admin: {
        "name": "pedasoft",
        "email": "info@pedasoft.com",
        "password": "pedasoft"
    },
    "enabled": true,
    "version": "1.1.0",
    "collections": [
        {
            "id": "competency",
            "name": "Competency",
            "description": {
                "en": "Competency is a collection of competencies.",
                "tr": "Yetkinliklerin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "competency_id",
                    "type": "string",
                },
                {
                    "key": "competency_name",
                    "type": "string",
                },
                {
                    "key": "competency_group_id",
                    "type": "string",
                },
                {
                    "key": "competency_group_name",
                    "type": "string",
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                },
                {
                    "key": "competency_real_value",
                    "type": "string",
                },
                {
                    "key": "competency_value_desc",
                    "type": "string",
                },
                {
                    "key": "employee_id",
                    "type": "string",
                },
                {
                    "key": "employee_name",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                },
                {
                    "key": "competency_evaluation_period",
                    "type": "string",
                },
                {
                    "key": "is_active_competency",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted_competency",
                    "type": "boolean",
                    "default": false,
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },
            ]
        },
        {
            "id": "competency_group",
            "name": "Competency Group",
            "description": {
                "en": "Competency Group is a collection of competency groups.",
                "tr": "Yetkinlik gruplarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "competency_group_id",
                    "type": "string",
                },
                {
                    "key": "competency_group_name",
                    "type": "string",
                },
                {
                    "key": "competency_grade_id",
                    "type": "string",
                },
                {
                    "key": "competency_grade_name",
                    "type": "string",
                },
                {
                    "key": "is_active_group",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted_group",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                }
            ]
        },
        {
            "id": "competency_department",
            "name": "Competency Department",
            "description": {
                "en": "Competency Department is a collection of competency departments.",
                "tr": "Yetkinlik departmanlarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "competency_department_table_id",
                    "type": "string",
                },
                {
                    "key": "competency_department_id",
                    "type": "string",
                },
                {
                    "key": "competency_department_name",
                    "type": "string",
                },
                {
                    "key": "competency_id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "competency_grade",
            "name": "Competency Grade",
            "description": {
                "en": "Competency Grade is a collection of competency grades.",
                "tr": "Yetkinlik derecelerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "competency_grade_id",
                    "type": "string",
                },
                {
                    "key": "competency_grade_name",
                    "type": "string",
                },
                {
                    "key": "is_active_grade",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted_grade",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },

            ]
        },
        {
            "id": "competency_grade_value",
            "name": "Competency Grade Value",
            "description": {
                "en": "Competency Grade Value is a collection of competency grade values.",
                "tr": "Yetkinlik derece değerlerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "competency_grade_value_id",
                    "type": "string",
                },
                {
                    "key": "grade_level_id",
                    "type": "string",
                },
                {
                    "key": "grade_level_name",
                    "type": "string",
                },
                {
                    "key": "grade_level_number",
                    "type": "string",
                },
                {
                    "key": "competency_id",
                    "type": "string",
                },
                {
                    "key": "is_active_level",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted_level",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },

            ]
        },
        {
            "id": "competency_grade_level",
            "name": "Competency Grade Level",
            "description": {
                "en": "Competency Grade Level is a collection of competency grade levels.",
                "tr": "Yetkinlik derece seviyelerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "grade_id",
                    "type": "string",
                },
                {
                    "key": "grade_level_id",
                    "type": "string",
                },
                {
                    "key": "grade_level_name",
                    "type": "string",
                },
                {
                    "key": "grade_level_number",
                    "type": "string",
                },
                {
                    "key": "is_active_level",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted_level",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },

            ]
        },
        {
            "id": "competency_evaluation_period",
            "name": "Competency Evaluation Period",
            "description": {
                "en": "Competency Evaluation Period is a collection of competency evaluation periods.",
                "tr": "Yetkinlik değerlendirme dönemlerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "evaluation_period_id",
                    "type": "string",
                },
                {
                    "key": "evaluation_period_name",
                    "type": "string",
                },
                {
                    "key": "evaluation_period_year",
                    "type": "string",
                },
                {
                    "key": "is_default_year",
                    "type": "string"
                },
                {
                    "key": "is_deleted_period",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },
            ]
        },
        {
            "id": "polyvalence_unit_table",
            "name": "Polyvalence Unit Table",
            "description": {
                "en": "Polyvalence Unit Table is a collection of polyvalence unit tables.",
                "tr": "Çok yönlü birim tablolarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                },
                {
                    "key": "polyvalence_department_id",
                    "type": "string"
                },
                {
                    "key": "polyvalence_department_name",
                    "type": "string"
                },
                {
                    "key": "polyvalence_evaluation_frequency",
                    "type": "string",
                },
                {
                    "key": "is_active_table",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted_table",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },

            ]
        },
        {
            "id": "polyvalence_unit_table_line_rel",
            "name": "Polyvalence Unit Table Line Relation",
            "description": {
                "en": "Polyvalence Unit Table Line Relation is a collection of polyvalence unit table line relations.",
                "tr": "Çok yönlü birim tablo hat ilişkilerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "polyvalence_table_line_relation_id",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                },
                {
                    "key": "line_id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "polyvalence_unit_table_data_respon",
            "name": "Polyvalence Unit Table Data Responsible",
            "description": {
                "en": "Polyvalence Unit Table Data Responsible is a collection of polyvalence unit table data responsibles.",
                "tr": "Çok yönlü birim tablo veri sorumlularının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "data_responsible_id",
                    "type": "string",
                },
                {
                    "key": "responsible_employee_id",
                    "type": "string",
                },
                {
                    "key": "responsible_employee_name",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "polyvalence_unit_table_data_viewer",
            "name": "Polyvalence Unit Table Data Viewer",
            "description": {
                "en": "Polyvalence Unit Table Data Viewer is a collection of polyvalence unit table data viewers.",
                "tr": "Çok yönlü birim tablo veri görüntüleyicilerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "data_viewer_id",
                    "type": "string",
                },
                {
                    "key": "viewer_employee_id",
                    "type": "string",
                },
                {
                    "key": "viewer_employee_name",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },

                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "employee_competency_value",
            "name": "Employee Competency Value",
            "description": {
                "en": "Employee Competency Value is a collection of employee competency values.",
                "tr": "Çalışan yetkinlik değerlerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "employee_competency_value_id",
                    "type": "string",
                },
                {
                    "key": "employee_id",
                    "type": "string",
                },
                {
                    "key": "employee_name",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                },
                {
                    "key": "competency_department_id",
                    "type": "string",
                },
                {
                    "key": "competency_department_name",
                    "type": "string",
                },
                {
                    "key": "competency_evaluation_period",
                    "type": "string",
                },
                {
                    "key": "competency_id",
                    "type": "string",
                },
                {
                    "key": "competency_name",
                    "type": "string",
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                },
                {
                    "key": "competency_real_value",
                    "type": "string",
                },
                {
                    "key": "competency_value_desc",
                    "type": "string",
                },
                {
                    "key": "is_active_competency_value",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted_competency_value",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string"
                },
            ]
        },
        {
            "id": "monitoring",
            "name": "Monitoring",
            "description": {
                "en": "Monitoring is a collection of monitorings.",
                "tr": "İzlemelerin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "lowest_accepted_average",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "monitoring_action",
            "name": "Monitoring Action",
            "description": {
                "en": "Monitoring Action is a collection of monitoring actions.",
                "tr": "İzleme eylemlerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "action_id",
                    "type": "string",
                },
                {
                    "key": "action_start_description",
                    "type": "string",
                },
                {
                    "key": "action_finish_description",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "year_performance",
                    "type": "string",
                },
                {
                    "key": "employee_id",
                    "type": "string",
                },
                {
                    "key": "employee_name",
                    "type": "string",
                },
                {
                    "key": "action_creator_employee_name",
                    "type": "string",
                },
                {
                    "key": "action_creator_employee_id",
                    "type": "string",
                },
                {
                    "key": "action_corroborative_employee_name",
                    "type": "string",
                },
                {
                    "key": "action_corroborative_employee_id",
                    "type": "string",
                },
                {
                    "key": "department_id",
                    "type": "string",
                },
                {
                    "key": "department_name",
                    "type": "string",
                },
                {
                    "key": "status",
                    "type": "string",
                },
                {
                    "key": "year",
                    "type": "string",
                },
                {
                    "key": "action_start_date",
                    "type": "string",
                },
                {
                    "key": "action_finish_date",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "monitoring_action_by_period",
            "name": "Monitoring Action By Period",
            "description": {
                "en": "Monitoring Action By Period is a collection of monitoring actions by periods.",
                "tr": "İzleme eylemlerinin dönemlere göre koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "action_id",
                    "type": "string",
                },
                {
                    "key": "action_start_description",
                    "type": "string",
                },
                {
                    "key": "action_finish_description",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "period_performance",
                    "type": "string",
                },
                {
                    "key": "employee_id",
                    "type": "string",
                },
                {
                    "key": "employee_name",
                    "type": "string",
                },
                {
                    "key": "action_creator_employee_name",
                    "type": "string",
                },
                {
                    "key": "action_creator_employee_id",
                    "type": "string",
                },
                {
                    "key": "action_corroborative_employee_name",
                    "type": "string",
                },
                {
                    "key": "action_corroborative_employee_id",
                    "type": "string",
                },
                {
                    "key": "department_id",
                    "type": "string",
                },
                {
                    "key": "department_name",
                    "type": "string",
                },
                {
                    "key": "status",
                    "type": "string",
                },
                {
                    "key": "period",
                    "type": "string",
                },
                {
                    "key": "action_start_date",
                    "type": "string",
                },
                {
                    "key": "action_finish_date",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "machine",
            "name": "Machine",
            "description": {
                "en": "Machine is a collection of machines.",
                "tr": "Makinelerin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "code",
                    "type": "string",
                },
                {
                    "key": "name",
                    "type": "string",
                },
                {
                    "key": "department_id",
                    "type": "string",
                },
                {
                    "key": "is_active_machine",
                    "type": "string",
                },
                {
                    "key": "difficulty_coefficient",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "competency_machine_association",
            "name": "Competency Machine Association",
            "description": {
                "en": "Competency Machine Association is a collection of competency machine associations.",
                "tr": "Yetkinlik makine ilişkilerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "machine_id",
                    "type": "string",
                },
                {
                    "key": "competency_id",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "competency_line_relation",
            "name": "Competency Line Relation",
            "description": {
                "en": "Competency Line Relation is a collection of competency line relations.",
                "tr": "Yetkinlik hat ilişkilerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "competency_id",
                    "type": "string",
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                },
                {
                    "key": "line_id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "organization_department",
            "name": "Organization Department",
            "description": {
                "en": "Organization Department is a collection of organization departments.",
                "tr": "Organizasyon departmanlarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string",
                },
                {
                    "key": "record_id",
                    "type": "string",
                },
                {
                    "key": "name",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                },

            ]
        },
        {
            "id": "organization_line",
            "name": "Organization Line",
            "description": {
                "en": "Organization Line is a collection of organization lines.",
                "tr": "Organizasyon hatlarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "department_id",
                    "type": "string",
                },
                {
                    "key": "department_name",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string",
                },
                {
                    "key": "record_id",
                    "type": "string",
                },
                {
                    "key": "name",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                },
            ]
        },
        {
            "id": "organization_position",
            "name": "Organization Position",
            "description": {
                "en": "Organization Position is a collection of organization positions.",
                "tr": "Organizasyon pozisyonlarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string",
                },
                {
                    "key": "record_id",
                    "type": "string",
                },
                {
                    "key": "name",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                },

            ]
        },
        {
            "id": "organization_title",
            "name": "Organization Title",
            "description": {
                "en": "Organization Title is a collection of organization titles.",
                "tr": "Organizasyon unvanlarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string",
                },
                {
                    "key": "record_id",
                    "type": "string",
                },
                {
                    "key": "name",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                },

            ]
        },
        {
            "id": "organization_employee",
            "name": "Organization Employee",
            "description": {
                "en": "Organization Employee is a collection of organization employees.",
                "tr": "Organizasyon çalışanlarının koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                },
                {
                    "key": "first_name",
                    "type": "string",
                },
                {
                    "key": "last_name",
                    "type": "string",
                },
                {
                    "key": "title_id",
                    "type": "string",
                },
                {
                    "key": "position_id",
                    "type": "string",
                },
                {
                    "key": "department_id",
                    "type": "string",
                },
                {
                    "key": "manager_id",
                    "type": "string",
                },
                {
                    "key": "line_id",
                    "type": "string",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                },
                {
                    "key": "realm_id",
                    "type": "string",
                }

            ]
        },
        {
            "id": "pedavalans_parameter",
            "name": "Pedavalans Parameter",
            "description": {
                "en": "Pedavalans Parameter is a collection of pedavalans parameters.",
                "tr": "Pedavalans parametrelerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string"
                },
                {
                    "key": "tenant_id",
                    "type": "string"
                },
                {
                    "key": "name",
                    "type": "string"
                },
                {
                    "key": "is_show",
                    "type": "boolean",
                    "default": false
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            "id": "account_relation",
            "name": "Account Relation",
            "description": {
                "en": "Account Relation is a collection of account relations.",
                "tr": "Hesap ilişkilerinin koleksiyonudur."
            },
            "version": "1.0.0",
            "attributes": [
                {
                    "key": "id",
                    "type": "string"
                },
                {
                    "key": "authorization_profile",
                    "type": "string"
                },
                {
                    "key": "tenant_id",
                    "type": "string"
                },
                {
                    "key": "account_id",
                    "type": "string"
                },
                {
                    "key": "is_admin",
                    "type": "boolean",
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false
                }
            ]
        },
        {
            id: "education",
            name: "Education",
            description: {
                en: "Education is a collection of educations.",
                tr: "Eğitimlerin koleksiyonudur."
            },
            version: "1.0.0",
            attributes: [
                {
                    key: "code",
                    type: "string"
                },
                {
                    key: "name",
                    type: "string"
                },
                {
                    key: "type",
                    type: "string"
                },
                {
                    key: "tenant_id",
                    type: "string"
                },
                {
                    key: "is_active",
                    type: "boolean",
                    default: true
                },
                {
                    key: "is_deleted",
                    type: "boolean",
                    default: false
                }
            ]
        },
        {
            id: "education_competency_relation",
            name: "Education Competency Relation",
            description: {
                en: "Education Competency Relation is a collection of education competency relations.",
                tr: "Eğitim yetkinlik ilişkilerinin koleksiyonudur."
            },
            version: "1.0.0",
            attributes: [
                {
                    key: "education_id",
                    type: "string"
                },
                {
                    key: "competency_id",
                    type: "string"
                },
                {
                    key: "competency_name",
                    type: "string"
                },
                {
                    key: "tenant_id",
                    type: "string"
                },
                {
                    key: "is_active",
                    type: "boolean",
                    default: true
                },
                {
                    key: "is_deleted",
                    type: "boolean",
                    default: false
                }
            ]
        }
    ]
}

export default Database;