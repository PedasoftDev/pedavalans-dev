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
    "version": 7,
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
                    "version": 1
                },
                {
                    "key": "competency_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_description",
                    "type": "string",
                    "version": 8
                },
                {
                    "key": "competency_group_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_group_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_real_value",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_value_desc",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_evaluation_period",
                    "type": "string",
                    "version": 1
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "competency_group_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_grade_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_grade_name",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "competency_department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_department_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "competency_grade_name",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "grade_level_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "grade_level_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "grade_level_number",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "grade_level_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "grade_level_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "grade_level_number",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "evaluation_period_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "evaluation_period_year",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "is_default_year",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_department_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_evaluation_frequency",
                    "type": "string",
                    "version": 1
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "responsible_employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "responsible_employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "viewer_employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "viewer_employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_table_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "polyvalence_table_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_department_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_evaluation_period",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_real_value",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_value_desc",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "lowest_accepted_average",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "action_start_description",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_finish_description",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "year_performance",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_creator_employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_creator_employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "status",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "year",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_start_date",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_finish_date",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "action_start_description",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_finish_description",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "period_performance",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_creator_employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_creator_employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_corroborative_employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "status",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "period",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_start_date",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "action_finish_date",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "code",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "is_active_machine",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "difficulty_coefficient",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "machine_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_target_value",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "record_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "first_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "last_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "title_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "position_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "manager_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "job_start_date",
                    "type": "string",
                    "version": 4
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
                    "version": 1
                },
                {
                    "key": "realm_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "authorization_profile",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "account_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "mail",
                    "type": "string",
                    "version": 7
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
                    "version": 1
                },
                {
                    "key": "collection_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "collection_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "attribute_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "type",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "competency_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "competency_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
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
                    "key": "education_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "education_code",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "education_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "educator_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "educator_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "start_date",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "end_date",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "hour",
                    "type": "string",
                    "version": 5
                },
                {
                    "key": "status",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
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
                    "key": "assigned_education_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "education_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "educator_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "educator_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "educator_comment",
                    "type": "string",
                    "version": 1
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
                    "version": 1
                },
                {
                    "key": "employee_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "log_date",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "log_type",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "job_start_date",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "department_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "position_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "position_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "line_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "line_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "title_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "title_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "manager_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "manager_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
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
                },
                {
                    key: 'document_type_code',
                    type: 'string',
                    version: 1,
                },
                {
                    key: 'document_type_name',
                    type: 'string',
                    version: 1,
                },
                {
                    key: 'document_is_validity_period',
                    type: 'string',
                    version: 1,
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
                },
                {
                    key: 'document_code',
                    type: 'string',
                    version: 1,
                },
                {
                    key: 'document_name',
                    type: 'string',
                    version: 1,
                },
                {
                    key: 'document_validity_period',
                    type: 'string',
                    version: 1,
                },
                {
                    key: 'document_type_id',
                    type: 'string',
                    version: 1,
                },
                {
                    key: 'document_type_name',
                    type: 'string',
                    version: 1,
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
                    "version": 1
                },
                {
                    "key": "document_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "document_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "document_type_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "document_type_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "document_id",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "document_name",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "end_date",
                    "type": "string",
                    "version": 1
                },
                {
                    "key": "tenant_id",
                    "type": "string",
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
                    "version": 1
                },
                {
                    "key": "value",
                    "type": "string",
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
        }
    ]
}

export default Database;