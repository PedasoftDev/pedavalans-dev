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
    "version": 39,
    "collections": [
        {
            "id": "competency",
            "name": "Competency",
            "description": {
                "en": "Competency is a collection of competencies.",
                "tr": "Yetkinliklerin koleksiyonudur."
            },
            "version": 1,
            "attributes": [
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_description",
                    "type": "string",
                    "size": 512,
                    "version": 8
                },
                {
                    "key": "competency_group_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_group_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_real_value",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_value_desc",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_evaluation_period",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "work_place_id",
                    "type": "string",
                    "size": 256,
                    "version": 33
                },
                {
                    "key": "work_place_name",
                    "type": "string",
                    "size": 256,
                    "version": 33
                },
                {
                    "key": "is_active_competency",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted_competency",
                    "type": "boolean",
                    "version": 1,
                    "default": false,
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "competency_group_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_group_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_grade_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_grade_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active_group",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted_group",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "competency_department_table_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "competency_grade_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_grade_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active_grade",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted_grade",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "competency_grade_value_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "grade_level_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "grade_level_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "grade_level_number",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active_level",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted_level",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "grade_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "grade_level_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "grade_level_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "grade_level_number",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active_level",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted_level",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "evaluation_period_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "evaluation_period_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "evaluation_period_year",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_default_year",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_deleted_period",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_evaluation_frequency",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "work_place_id",
                    "type": "string",
                    "size": 256,
                    "version": 35
                },
                {
                    "key": "work_place_name",
                    "type": "string",
                    "size": 256,
                    "version": 35
                },
                {
                    "key": "is_active_table",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted_table",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "polyvalence_table_line_relation_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "data_responsible_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "responsible_employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "responsible_employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "data_viewer_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "viewer_employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "viewer_employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },

                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "employee_competency_value_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_evaluation_period",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_real_value",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_value_desc",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active_competency_value",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted_competency_value",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "lowest_accepted_average",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "action_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_start_description",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_finish_description",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "year_performance",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_creator_employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_creator_employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "status",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "year",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_start_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_finish_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "action_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_start_description",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_finish_description",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "period_performance",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_creator_employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_creator_employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "status",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "period",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_start_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "action_finish_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "code",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active_machine",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "difficulty_coefficient",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "machine_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "parent_department_id",
                    "type": "string",
                    "size": 256,
                    "version": 16
                },
                {
                    "key": "parent_department_name",
                    "type": "string",
                    "size": 256,
                    "version": 16
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },

            ]
        },
        {
            "id": "position_relation_departments",
            "name": "Position Relation Departments",
            "description": {
                "en": "Position Relation Departments Line is a collection of Position Relation Departments.",
                "tr": "Departmanlara bağlı pozisyonların listesi."
            },
            "version": 18,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "parent_department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "parent_department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "relation_position_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "relation_position_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "first_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "last_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "title_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "position_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "workplace_id",
                    "type": "string",
                    "size": 256,
                    "version": 31
                },
                {
                    "key": "manager_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "job_start_date",
                    "type": "string",
                    "size": 256,
                    "version": 4
                },
                {
                    "key": "birth_date",
                    "type": "string",
                    "size": 256,
                    "version": 9
                },
                {
                    "key": "gender",
                    "type": "string",
                    "size": 256,
                    "version": 9
                },
                {
                    "key": "educational_status",
                    "type": "string",
                    "size": 256,
                    "version": 14
                },
                {
                    "key": "department_start_date",
                    "type": "string",
                    "size": 256,
                    "version": 10
                },
                {
                    "key": "position_start_date",
                    "type": "string",
                    "size": 256,
                    "version": 10
                },
                {
                    "key": "phone",
                    "type": "string",
                    "size": 256,
                    "version": 10
                },
                {
                    "key": "email",
                    "type": "string",
                    "size": 256,
                    "version": 39
                },
                {
                    "key": "proxy_employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 39
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_show",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
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
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "authorization_profile",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "account_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "mail",
                    "type": "string",
                    "size": 256,
                    "version": 7
                },
                {
                    "key": "registration_number",
                    "type": "string",
                    "size": 256,
                    "version": 37
                },
                {
                    "key": "is_admin",
                    "type": "boolean",
                    "version": 1,
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                }
            ]
        },
        {
            "id": "database_version",
            "name": "Database Version",
            "description": {
                "en": "Database Version is a collection of database versions.",
                "tr": "Veritabanı versiyonlarının koleksiyonudur."
            },
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "version",
                    "type": "number",
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                }
            ]
        },
        {
            "id": "collection_version",
            "name": "Collection Version",
            "description": {
                "en": "Collection Version is a collection of collection versions.",
                "tr": "Koleksiyon versiyonlarının koleksiyonudur."
            },
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "collection_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "version",
                    "type": "number",
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                }
            ]
        },
        {
            "id": "collection_attribute_version",
            "name": "Collection Attribute Version",
            "description": {
                "en": "Collection Attribute Version is a collection of collection attribute versions.",
                "tr": "Koleksiyon nitelik versiyonlarının koleksiyonudur."
            },
            "version": 1,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "collection_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "attribute_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "version",
                    "type": "number",
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                }
            ]
        },
        {
            "id": "education",
            "name": "Education",
            "description": {
                en: "Education is a collection of educations.",
                tr: "Eğitimlerin koleksiyonudur."
            },
            "version": 2,
            "attributes": [
                {
                    "key": "code",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "type",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "education_plan",
            "name": "Education Plan",
            "description": {
                en: "Education plan is a collection of educations.",
                tr: "Eğitim Planlarının koleksiyonudur."
            },
            "version": 11,
            "attributes": [
                {
                    "key": "education_plan_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "education_plan_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "work_place_id",
                    "type": "string",
                    "size": 256,
                    "version": 37
                },
                {
                    "key": "work_place_name",
                    "type": "string",
                    "size": 256,
                    "version": 37
                },
                {
                    "key": "plan_start_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "plan_end_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "education_competency_relation",
            "name": "Education Competency Relation",
            "description": {
                en: "Education Competency Relation is a collection of education competency relations.",
                tr: "Eğitim yetkinlik ilişkilerinin koleksiyonudur."
            },
            "version": 2,
            "attributes": [
                {
                    "key": "education_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "assigned_education",
            "name": "Assigned Education",
            "description": {
                en: "Assigned Education is a collection of assigned educations.",
                tr: "Atanmış eğitimlerin koleksiyonudur."
            },
            "version": 2,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 21
                },
                {
                    "key": "main_assigned_education_id",
                    "type": "string",
                    "size": 256,
                    "version": 19
                },
                {
                    "key": "education_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "education_code",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "education_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "educator_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "educator_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "education_plan_id",
                    "type": "string",
                    "size": 256,
                    "version": 14
                },
                {
                    "key": "education_plan_name",
                    "type": "string",
                    "size": 256,
                    "version": 14
                },

                {
                    "key": "start_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "end_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "start_hour",
                    "type": "string",
                    "size": 256,
                    "version": 15
                },
                {
                    "key": "hour",
                    "type": "string",
                    "size": 256,
                    "version": 5
                },
                {
                    "key": "status",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "location",
                    "type": "string",
                    "size": 256,
                    "version": 12
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "assigned_education_result",
            "name": "Assigned Education Result",
            "description": {
                "en": "Assigned Education Result is a collection of assigned education results.",
                "tr": "Atanmış eğitim sonuçlarının koleksiyonudur."
            },
            "version": 3,
            "attributes": [
                {
                    "key": "row_id",
                    "type": "string",
                    "size": 256,
                    "version": 23
                },
                {
                    "key": "assigned_education_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "education_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "educator_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "educator_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "educator_comment",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "point",
                    "type": "number",
                    "size": 256,
                    "version": 22
                },
                {
                    "key": "attendance_status",
                    "type": "boolean",
                    "size": 256,
                    "version": 22
                },
                {
                    "key": "is_education_completed",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "organization_employee_log",
            "name": "Organization Employee Log",
            "description": {
                "en": "Organization Employee Log is a collection of organization employee logs.",
                "tr": "Organizasyon çalışan loglarının koleksiyonudur."
            },
            "version": 4,
            "attributes": [
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "log_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "log_type",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "job_start_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "position_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "position_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "title_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "title_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "manager_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "manager_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            id: 'vocational_qualification_type',
            name: 'Vocational Qualification Type',
            description: {
                en: 'A collection of logs of Vocational Qualification types.',
                tr: 'Mesleki Yeterlilik türlerinin loglarının koleksiyonudur.',
            },
            version: 5,
            attributes: [
                {
                    key: 'document_type_id',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_type_code',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_type_name',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_is_validity_period',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'is_active',
                    type: 'boolean',
                    default: true,
                    version: 1,
                },
                {
                    key: 'is_deleted',
                    type: 'boolean',
                    default: false,
                    version: 1,
                },
                {
                    key: 'tenant_id',
                    type: 'string',
                    version: 1,
                    size: 256
                },
            ],
        },
        {
            id: 'vocational_qualification',
            name: 'Vocational Qualification',
            description: {
                en: 'A collection of logs of Vocational Qualification.',
                tr: 'Mesleki Yeterliliğin loglarının koleksiyonudur.',
            },
            version: 5,
            attributes: [
                {
                    key: 'document_id',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_code',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_name',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_validity_period',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_type_id',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'document_type_name',
                    type: 'string',
                    version: 1,
                    size: 256
                },
                {
                    key: 'is_active',
                    type: 'boolean',
                    default: true,
                    version: 1
                },
                {
                    key: 'is_deleted',
                    type: 'boolean',
                    default: false,
                    version: 1
                },
                {
                    key: 'tenant_id',
                    type: 'string',
                    version: 1,
                    size: 256
                },
            ],
        },
        {
            "id": "position_vocational_qualification",
            "name": "Position Vocational Qualification Relation",
            "description": {
                en: "Position Vocational Qualification Relation is a collection of position vocational qualification relations.",
                tr: "Poziyonlar ile Mesleki Yeterlilik ilişkilerinin koleksiyonudur."
            },
            "version": 6,
            "attributes": [
                {
                    "key": "position_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "document_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "document_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "organization_employee_document",
            "name": "Organization Employee Document",
            "description": {
                en: "Organization Employee Document is a collection of position vocational qualification relations.",
                tr: "Çalışan dökümanları ilişkilerinin koleksiyonudur."
            },
            "version": 6,
            "attributes": [
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "document_type_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "document_type_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "document_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "document_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "end_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "string_parameter",
            "name": "String Parameter",
            "description": {
                en: "",
                tr: ""
            },
            "version": 7,
            "attributes": [
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "value",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "chart_value",
            "name": "Chart Value",
            "description": {
                "en": "Chart Value is a collection of chart values.",
                "tr": "Grafik değerlerinin koleksiyonudur."
            },
            "version": 9,
            "attributes": [
                {
                    "key": "key",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "value",
                    "type": "string",
                    "size": 1024,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "polyvalence_unit_position_relation",
            "name": "Polyvalence Unit Position Relation",
            "description": {
                "en": "Polyvalence Unit Position Relation is a collection of polyvalence unit position relations.",
                "tr": "Çoklu birim pozisyon ilişkilerinin koleksiyonudur."
            },
            "version": 13,
            "attributes": [
                {
                    "key": "position_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "polyvalence_unit_id",
                    "type": "string",
                    "size": 1024,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "competency_position_relation",
            "name": "Competency Position Relation",
            "description": {
                "en": "Competency Position Relation is a collection of competency position relations.",
                "tr": "Yetkinlik pozisyon ilişkilerinin koleksiyonudur."
            },
            "version": 13,
            "attributes": [
                {
                    "key": "position_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 1024,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "trainers",
            "name": "Trainers",
            "description": {
                "en": "Trainers is a collection of trainers.",
                "tr": "Eğiticilerin koleksiyonudur."
            },
            "version": 14,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "trainer_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "trainer_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "trainer_educations",
            "name": "Trainer Educations",
            "description": {
                "en": "Trainer Educations is a collection of trainer educations.",
                "tr": "Eğiticilere bağlı olan eğitimlerin koleksiyonudur."
            },
            "version": 14,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "trainer_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "trainer_duty_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "trainer_duty_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "assigned_education_employees",
            "name": "Assigned Education Employees",
            "description": {
                "en": "TAssigned Education Employees is a collection of Assigned Education Employees.",
                "tr": "Atanan Egitime bagli calisanlarin koleksiyonudur."
            },
            "version": 20,
            "attributes": [
                {
                    "key": "main_assigned_education_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "email_message",
            "name": "Email Message",
            "description": {
                "en": "Email Message is a collection of email messages.",
                "tr": "Email mesajlarının koleksiyonudur."
            },
            "version": 24,
            "attributes": [
                {
                    "key": "sender",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "recipient",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "subject",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "content",
                    "type": "string",
                    "size": 1024,
                    "version": 1
                },
                {
                    "key": "status",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "errorReason",
                    "type": "string",
                    "size": 512,
                    "version": 1
                },
                {
                    "key": "attemptCount",
                    "type": "number",
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "mail_settings",
            "name": "Mail Settings",
            "description": {
                "en": "Mail Settings is a collection of mail settings.",
                "tr": "Mail ayarlarının koleksiyonudur."
            },
            "version": 24,
            "attributes": [
                {
                    "key": "smtp_server",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "smtp_port",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "username",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "password",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tls",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "education_competency_status_infos",
            "name": "Education Competency Status Infos",
            "description": {
                "en": "Education Competency Status Infos is a collection of education competency status infos.",
                "tr": "Egitimlerin compteyencye ozel puan durumlarinin koleksiyonudur."
            },
            "version": 25,
            "attributes": [
                {
                    "key": "education_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 28
                },
                {
                    "key": "lower_bound",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "upper_bound",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_level",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_level_id",
                    "type": "string",
                    "size": 256,
                    "version": 29
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 27
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "default": true,
                    "version": 1
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "default": false,
                    "version": 1
                }
            ]
        },
        {
            "id": "organization_workplace",
            "name": "Organization Workplace",
            "description": {
                "en": "Organization Workplace is a collection of organization workplace.",
                "tr": "Organizasyon is yeri koleksiyonudur."
            },
            "version": 30,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },

            ]
        },
        {
            "id": "related_departments_workplaces",
            "name": "Related Departments Workplaces",
            "description": {
                "en": "Related Departments Workplaces is a collection of related departments workplaces.",
                "tr": "Ilgili departmanlarin is yeri koleksiyonudur."
            },
            "version": 32,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "workplace_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "workplace_record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "related_department_record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "related_department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },

            ]
        },
        {
            "id": "related_position_workplaces",
            "name": "Related Position Workplaces",
            "description": {
                "en": "Related Position Workplaces is a collection of related position workplaces.",
                "tr": "Ilgili pozisyonlarin is yeri koleksiyonudur."
            },
            "version": 32,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "workplace_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "workplace_record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "related_position_record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "related_positon_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },

            ]
        },
        {
            "id": "competency_work_place",
            "name": "Competency Work Place",
            "description": {
                "en": "Competency Work Place is a collection of competency work place.",
                "tr": "Yetkinlik is yeri koleksiyonudur."
            },
            "version": 34,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "work_place_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "work_place_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },

            ]
        },
        {
            "id": "related_workplaces_to_trainer",
            "name": "Related Workplaces To Trainer",
            "description": {
                "en": "Related Workplaces To Trainer is a collection of related workplaces to trainer.",
                "tr": "Eğiticiye bağlı iş yerlerinin koleksiyonudur."
            },
            "version": 37,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "trainer_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "work_place_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "work_place_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },

            ]
        },
        {
            "id": "employee_line_relation",
            "name": "Employee Line Relation",
            "description": {
                "en": "Employee Line Relation is a collection of employee line relations.",
                "tr": "Çalışan hat ilişkilerinin koleksiyonudur."
            },
            "version": 37,
            "attributes": [
                {
                    "key": "id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_record_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "line_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },

            ]
        },
        {
            "id": "proxy_account",
            "name": "Proxy Account",
            "description": {
                "en": "",
                "tr": ""
            },
            "version": 39,
            "attributes": [
                {
                    "key": "principal_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "agent_name",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "start_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "end_date",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "password",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "email",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "power_of_attorney_type",
                    "type": "string",
                    "size": 256,
                    "version": 1
                },
                {
                    "key": "is_active",
                    "type": "boolean",
                    "version": 1,
                    "default": true
                },
                {
                    "key": "is_deleted",
                    "type": "boolean",
                    "version": 1,
                    "default": false
                },
            ]
        },
    ]
}

export default Database;