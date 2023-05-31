export const getmenuFrontend = (privileges: string[]) => {
    let menu: any = [
        {
            text: "Usuarios",
            icon: "groups",
            children: [
            ]
        },
        {
            text: "Unidades",
            icon: "domain",
            children: [
            ]
        }
    ]
    privileges.forEach(privilege => {
        switch (privilege) {
            case 'cuentas':
                menu[0].children.push(
                    {
                        text: "Cuentas",
                        icon: "account_circle",
                        routerLink: "configuraciones/cuentas",
                    }
                )
                break;
            case 'usuarios':
                menu[0].children.push(
                    {
                        text: "Funcionarios",
                        icon: "person",
                        routerLink: "configuraciones/funcionarios",
                    },
                )
                break;
            case 'roles':
                menu[0].children.push(
                    {
                        text: "Roles",
                        icon: "badge",
                        routerLink: "configuraciones/roles",
                    },
                )
                break
            case 'instituciones':
                menu[1].children.push(
                    {
                        text: "Instituciones",
                        icon: "apartment",
                        routerLink: "configuraciones/instituciones",
                    },
                )
                break
            case 'dependencias':
                menu[1].children.push(
                    {
                        text: "Dependencias",
                        icon: "holiday_village",
                        routerLink: "configuraciones/dependencias",
                    }
                )
                break
            case 'tipos':
                menu.push(
                    {
                        text: "Tipos",
                        icon: "folder_copy",
                        routerLink: "configuraciones/tipos",
                    },
                )
                break;
            case 'externos':
                menu.push(
                    {
                        text: "Externos",
                        icon: "folder",
                        routerLink: "tramites/externos",
                    }
                )
                break;
            case 'internos':
                menu.push(
                    {
                        text: "Internos",
                        icon: "description",
                        routerLink: "tramites/internos"
                    }
                )
                break;
            case 'entradas':
                menu.push(
                    {
                        text: "Bandeja entrada",
                        icon: "drafts",
                        routerLink: "bandejas/entrada",
                    },
                )
                break;
            case 'salidas':
                menu.push(
                    {
                        text: "Bandeja salida",
                        icon: "mail",
                        routerLink: "bandejas/salida",
                    },
                )
                break;
            case 'archivos':
                menu.push(
                    {
                        text: "Archivos",
                        icon: "file_copy",
                        routerLink: "archivos",
                    },
                )
                break;
            case 'busquedas':
                menu.push(
                    {
                        text: "Busquedas",
                        icon: "search",
                        routerLink: "reportes/busquedas",
                    },
                )
                break;

            default:
                break;
        }
    });
    privileges.some(privilege => privilege === 'reporte')
        ? menu.push({
            text: "Reportes",
            icon: "mail",
            routerLink: "reportes",
        })
        : ''

    menu = menu.filter(item => !item.children || item.children.length > 0)
    return menu
}
