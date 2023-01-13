import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items: MenuItem[];

    lineData: any;
    barData: any;
    pieData: any;
    pieData2: any;
    polarData: any;
    radarData: any;

    constructor() {}

    ngOnInit() {
        
        this.lineData = {
            labels: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
            datasets: [
                {
                    label: 'Estudiantes Locales',
                    data: [65, 33, 80, 12, 56, 55, 40],
                    fill: false,
                    backgroundColor: '#ff7675',
                    borderColor: '#ff7675',
                    tension: .4
                },
                {
                    label: 'Estudiantes Foraneos',
                    data: [28, 48, 10, 19, 86, 27, 10],
                    fill: false,
                    backgroundColor: '#8c7ae6',
                    borderColor: '#8c7ae6',
                    tension: .4
                }
            ]
        };

        this.barData = {
            labels: ['Visual', 'Auditiva', 'Intelectual', 'Física', 'Intelectual', 'Múltiple', 'Psicosocial'],
            datasets: [
                {
                    label: 'Estudiantes locales',
                    backgroundColor: '#ff7675',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Estudiantes foraneos',
                    backgroundColor: '#8c7ae6',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.pieData = {
            labels: ['Locales', 'Foraneos', 'Extranjeros'],
            datasets: [
                {
                    data: [77, 19, 4],
                    backgroundColor: [
                        "#e17055",
                        "#6c5ce7",
                        "#78e08f"
                    ],
                    hoverBackgroundColor: [
                        "#e17055",
                        "#6c5ce7",
                        "#78e08f"
                    ]
                }
            ]
        };

        this.pieData2 = {
            labels: ['Locales', 'Foraneos', 'Extranjeros'],
            datasets: [
                {
                    data: [89, 9, 2],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };

        this.polarData = {
            datasets: [{
                data: [ 11, 16, 7, 3, 14 ],
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Docentes",
                "Temporales",
                "Administrativos",
                "Mixtos",
                "Contrato Personal"
            ]
        };

        this.radarData = {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            datasets: [
                {
                    label: 'Estudiantes Locales',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'Estudiantes Foraneos',
                    backgroundColor: 'rgba(251, 197, 49,0.2)',
                    borderColor: 'rgba(53, 59, 72,1.0)',
                    pointBackgroundColor: 'rgba(251, 197, 49,1.0)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(251, 197, 49,1.0)',
                    data: [28, 48, 40, 19, 96, 27, 100]
                },
                {
                    label: 'Estudiantes Extranjeros',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [8, 18, 20, 39, 26, 17, 10]
                }
            ]
        };  
    }

}
