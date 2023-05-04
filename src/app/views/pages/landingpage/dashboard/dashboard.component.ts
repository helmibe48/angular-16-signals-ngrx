import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/appState.interface';
import * as PostsActions from '../store/actions';
import { isLoadingSelector } from '../store/selectors';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
//PDF MAKE
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  tanggal_masuk = '2023-01-25';
  tabel_uterus = [
    { jam: '06:30', jumlah: 2, lama: 15 },
    { jam: '07:00', jumlah: 3, lama: 30 },
    { jam: '07:30', jumlah: 3, lama: 30 },
    { jam: '08:00', jumlah: 4, lama: 45 },
  ];
  tabel_urine = [
    { jam: '18:30', protein: '+', glukosa: '-', aseton: '++', volume: 100 },
  ];
  tabel_suhu = [
    { jam: '09:32', suhu: 30 },
    { jam: '20:35', suhu: 45 },
    { jam: '12:40', suhu: 35 },
  ];
  tabel_serviks = [
    { jam: '08:00', pembukaan: 4, penurunan: 4 },
    { jam: '11:00', pembukaan: 8, penurunan: 3 },
    { jam: '12:30', pembukaan: 10, penurunan: 1 },
  ];
  tabel_oksitosin = [{ jam: '08:38', unit: 31, tetes: 2 }];
  tabel_nadi = [
    { jam: '13:32', denyut: 85 },
    { jam: '13:37', denyut: 90 },
    { jam: '13:42', denyut: 90 },
    { jam: '13:52', denyut: 83 },
    { jam: '14:00', denyut: 80 },
    { jam: '14:12', denyut: 86 },
    { jam: '14:22', denyut: 83 },
    { jam: '14:32', denyut: 87 },
    { jam: '14:42', denyut: 90 },
    { jam: '14:52', denyut: 95 },
  ];
  tabel_molase = [{ jam: '19:27', hasil: '1 Tulang kepala janin bersentuhan' }];
  tabel_ketuban = [
    { jam: '09:32', hasil: 'U Ketuban pecah dan air jernih' },
    { jam: '20:35', hasil: 'U Ketuban pecah dan air jernih' },
    { jam: '12:30', hasil: 'J Ketuban pecah dan air jernih' }
  ];
  tabel_jantung = [
    { jam: '05:30', denyut: 90 },
    { jam: '06:35', denyut: 100 },
    { jam: '07:40', denyut: 120 },
    { jam: '08:45', denyut: 170 },
    { jam: '09:50', denyut: 140 },
    { jam: '10:55', denyut: 150 },
    { jam: '11:50', denyut: 180 },
  ];
  tabel_darah = [
    { jam: '13:32', tekanan: 80, tekanan2: 120 },
    { jam: '14:32', tekanan: 90, tekanan2: 130 },
  ];
  pukul_masuk = '08:34:00';
  pukul_mules = '17:25:00';
  pukul_ketuban = '04:25:00';
  id_regist_number = 2212270003;
  id = 3;
  created_by = 1991210014;
  created_at = '2023-01-20 10:53:17.000';

  // private chartJantungD: am4charts.XYChart;
  // private chartTabelD: am4charts.XYChart;

  // isLoading$: Observable<boolean>;

  // .map(x => {for(let i = 1; i < 33; i++){
    //   let jam = x.jam
    //   console.log(jam);
    // }});
  chartSuhu: any = [];
  updatedTableSuhu:any = [];
  table_suhu_minutes: any = [];

  constructor(
    private store: Store<AppStateInterface>,
    private datePipe: DatePipe,
    private renderer: Renderer2,
    private el: ElementRef,

  ) {
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // this.chartJantungD = new am4charts.XYChart();
    // this.chartTabelD = new am4charts.XYChart();
  }

  ngOnInit(): void {
    this.chartSuhu = Array(32).fill({jam: '', suhu: ''});
    this.setarakanJam(this.tabel_suhu);

  }

  ngAfterViewInit(): void {

    let jamPertama = moment(this.updatedTableSuhu[0].jam, 'HH:mm')
    this.chartSuhu[0] = {
      jam: jamPertama.hour() * 60 + jamPertama.minute(),
      suhu: this.updatedTableSuhu[0].suhu
    };

    for (let i = 1; i < this.chartSuhu.length; i++) {
      let jamSebelumnya = this.chartSuhu[i-1].jam;
      this.chartSuhu[i] = {
        jam: jamSebelumnya + 60,
        suhu: ''
      };
    }
    console.log('ini time slots',this.chartSuhu);
    this.momentMenit()
    console.log('ini tabel suhu',this.table_suhu_minutes);

    this.table_suhu_minutes.forEach((item: { jam: any; suhu: any; }) => {
      const index = this.chartSuhu.findIndex((x: { jam: any; }) => x.jam === item.jam);
      if (index !== -1) {
        this.chartSuhu[index].suhu = item.suhu;
      }
    });

    this.tabel_ketuban = this.tabel_ketuban.map(item => {
      return {
        jam: item.jam,
        hasil: item.hasil.substring(0, 1)
      };
    });
  }

  setarakanJam(tabel: any) {
    for (let isi of tabel) {
      let [hour, minute] = isi.jam.split(':').map(Number);
      if (minute < 20) {
        minute = 0;
      } else if (minute >= 20 && minute <= 40) {
        minute = 30;
      } else {
        minute = 0;
        hour += 1;
      }
      this.updatedTableSuhu.push({
        jam: `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`,
        suhu: isi.suhu,
      });
    }
    // console.log('ini update table',this.updatedTableSuhu);
    return this.updatedTableSuhu;
  }

  momentMenit(){
    this.updatedTableSuhu.map((item: { jam: moment.MomentInput; suhu: any; }) => {
      const momentObj = moment(item.jam, 'HH:mm');
      return this.table_suhu_minutes.push({
        jam: momentObj.hour() * 60 + momentObj.minute(),
        suhu: item.suhu
      });
    });
  }



  ngOnDestroy(): void {
    // this.chartJantungD.dispose();
    // this.chartTabelD.dispose();
  }
}
