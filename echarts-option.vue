<template>
  <div style="background: #F5FAF8;">
    <div class="row">
      <div class="rowItem first">
        <div class="rowItemText">
          <span>
            <img src="../../assets/project-count.png" />
            <p><label style="font-size: .7rem;">{{ countData.projectCount || 0 }}</label><br/>项目数量</p>
          </span>
          <span>
            <img src="../../assets/operator-count.png" />
            <p><label style="font-size: .7rem;">{{ countData.roleCount || 0 }}</label><br/>运维人数</p>
          </span>
          <span>
            <img src="../../assets/sheet-count.png" />
            <p><label style="font-size: .7rem;">{{ countData.workOrderCount || 0 }}</label><br/>工单数量</p>
          </span>
        </div>
        <div class="rowItemChart">
          <img class="title-img" src="../../assets/chart-elec.png" alt="" />
          <div class="title">储能站统计 / 能源站统计 / 配电房统计</div>
          <div class="echart elec" id="elec">
            <div class="circle" @click="showChart(1)">
              <p style="margin-top: 54px;padding-right: 10px;"><span>数量</span><span><b>{{ countData.energyStorage && countData.energyStorage.count || 0 }}</b><span class="unit">座</span></span></p>
              <p style="padding-right: 10px;"><span>装机容量</span><span><b>{{ countData.energyStorage && countData.energyStorage.capacity || 0 }}</b><sub>MW·h</sub></span></p>
              <p style="padding-right: 10px;"><span>装机功率</span><span><b>{{ countData.energyStorage && countData.energyStorage.totalPower || 0 }}</b><sub>MW</sub></span></p>
              <img src="../../assets/bg-energy.png" />
              <p class="type">储能站</p>
            </div>
            <div class="circle" @click="showChart(2)">
              <p style="margin-top: 10px;"><span>数量</span><span><b>{{ countData.heatStorage && countData.heatStorage.count || 0 }}</b><span class="unit">座</span></span></p>
              <p><span>总供热功率</span><span><b>{{ countData.heatStorage && countData.heatStorage.totalHeatPower || 0 }}</b><sub>MW</sub></span></p>
              <p><span>总制冷功率</span><span><b>{{ countData.heatStorage && countData.heatStorage.totalColdPower || 0 }}</b><sub>MW</sub></span></p>
              <p><span>总供热量</span><span><b>{{ countData.heatStorage && countData.heatStorage.totalHeatStorage || 0 }}</b><sub>MJ</sub></span></p>
              <p><span>总制冷量</span><span><b>{{ countData.heatStorage && countData.heatStorage.totalCoolingCapacity || 0 }}</b><sub>MJ</sub></span></p>
              <img src="../../assets/bg-hot.png" />
              <p class="type">能源站</p>
            </div>
            <div class="circle" @click="showChart(3)">
              <p style="margin-top: 54px;"><span>数量</span><span><b>{{ countData.transformer && countData.transformer.count || 0 }}</b><span class="unit">座</span></span></p>
              <p><span>装机容量</span><span><b>{{ countData.transformer && countData.transformer.capacity || 0 }}</b><sub>kVA</sub></span></p>
              <img src="../../assets/bg-room.png" />
              <p class="type">配电房</p>
            </div>
          </div>
          <div id="echartDetail">
            <div class="hideBack" @click="backChart"><i class="el-icon-circle-close-outline"></i></div>
            <div class="echart" id="elecChart"></div>
          </div>
        </div>
      </div>
      <div class="rowItem map">
        <img class="title-img" src="../../assets/chart-project.png" alt="" />
        <div class="title" style="border-bottom: none;">项目分布</div>
        <div class="echart" id="myMap"></div>
        <div id="myMapDetail">
          <div class="hideBack" @click="backMap"><i class="el-icon-circle-close-outline"></i></div>
          <div class="echart" id="detailChart"></div>
        </div>
      </div>
    </div>
    <div class="row" style="height: 400px;">
      <div class="rowItem">
        <img class="title-img" src="../../assets/chart-env.png" alt="" />
        <div class="title">环保减排量</div>
        <div style="display: flex;margin-top: 28px;">
          <div class="echart" id="envChart"></div>
          <div class="echart" id="wastedChart"></div>
        </div>
      </div>
      <div class="rowItem">
        <img class="title-img" src="../../assets/chart-sheet.png" alt="" />
        <div class="title">工单分布统计 / 运维人员统计</div>
        <div class="tabs">
          <el-radio-group v-model="radio" size="mini" @change="handleTabs">
            <el-radio-button label="工单"></el-radio-button>
            <el-radio-button label="人员"></el-radio-button>
          </el-radio-group>
        </div>
        <!-- 工单 -->
        <div style="display: flex;" class="common-animation" v-show="radio=='工单'">
          <div class="echart" id="sheetChart"></div>
          <div class="brief">
            <p class="item">
              <span>待接收</span>
              <span>{{ sheetData.hasBeenAssigedCount || 0 }} <span class="unit">单</span></span>
              <span>{{ sheetData.hasBeenAssigedCountProportion && sheetData.hasBeenAssigedCountProportion.split('%')[0] || 0 }} <span class="unit">%</span></span>
            </p>
            <p class="item">
              <span>进行中</span>
              <span>{{ sheetData.haveInHandCount || 0 }} <span class="unit">单</span></span>
              <span>{{ sheetData.haveInHandProportion && sheetData.haveInHandProportion.split('%')[0] || 0 }} <span class="unit">%</span></span>
            </p>
            <p class="item">
              <span>待确认</span>
              <span>{{ sheetData.waitSureCount || 0 }} <span class="unit">单</span></span>
              <span>{{ sheetData.waitSureProportion && sheetData.waitSureProportion.split('%')[0] || 0 }} <span class="unit">%</span></span>
            </p>
            <p class="item">
              <span>已取消</span>
              <span>{{ sheetData.alreadyExitCount || 0 }} <span class="unit">单</span></span>
              <span>{{ sheetData.alreadyExitProportion && sheetData.alreadyExitProportion.split('%')[0] || 0 }} <span class="unit">%</span></span>
            </p>
            <p class="item">
              <span>已完成</span>
              <span>{{ sheetData.alreadyComptendCount || 0 }} <span class="unit">单</span></span>
              <span>{{ sheetData.alreadyComptendProportion && sheetData.alreadyComptendProportion.split('%')[0] || 0 }} <span class="unit">%</span></span>
            </p>
          </div>
        </div>
        <!-- 人员 -->
        <div class="operator-area common-animation" v-show="radio=='人员'">
          <span>
            <label @mouseover="showCityBox(1)" @mouseout="showCityBox(0)">{{ curProvince }}
              <div class="city-list" v-show="cityFlag">
                <span :class="{cityName: true, active: item.value == curProvince}" v-for="(item, i) in provinceList" :key="i" @click="selectCity(item.value)">{{ item.value }}</span>
        </div>
        <i class="el-icon-caret-bottom city-arrow"></i>
        </label>运维人员分布</span>
        <span>运维人员类型</span>
      </div>
      <div class="common-animation" style="display: flex;" v-show="radio=='人员'">
        <div class="echart" id="operatorChart"></div>
        <div class="brief" id="operatorTypeChart" style="padding: 0;"></div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { getProvince } from '@/utils/getCity'
import chinaJson from '@/utils/map/json/china.json'
export default {
  data() {
    return {
      myMap: null,
      elecChart: null,
      envChart: null,
      wastedChart: null,
      sheetChart: null,
      detailChart: null,
      operatorChart: null,
      operatorTypeChart: null,
      countData: {},
      sheetData: {},
      myMapOption: {},
      operatorTypeOption: {},
      sheetOption: {},
      radio: '工单',
      curProvince: '江苏',
      provinceList: [],
      cityFlag: false
    };
  },
  mounted() {
    getProvince().then(data => { this.provinceList = data; });
    let w = window.getComputedStyle(document.getElementById('myMap')).width;
    document.getElementById('detailChart').style.width = w;
    this.$echarts.registerMap('china', chinaJson);
    this.myMap = this.$echarts.init(document.getElementById('myMap'));
    this.elecChart = this.$echarts.init(document.getElementById('elecChart'));
    this.envChart = this.$echarts.init(document.getElementById('envChart'));
    this.wastedChart = this.$echarts.init(document.getElementById('wastedChart'));
    this.sheetChart = this.$echarts.init(document.getElementById('sheetChart'));
    this.detailChart = this.$echarts.init(document.getElementById('detailChart'));
    this.operatorChart = this.$echarts.init(document.getElementById('operatorChart'));
    this.operatorTypeChart = this.$echarts.init(document.getElementById('operatorTypeChart'));
    this.initData();
    window.addEventListener('resize', () => {
      if (document.getElementById('myMap')) {
        let w = window.getComputedStyle(document.getElementById('myMap')).width;
        document.getElementById('detailChart').style.width = w;
      }
      this.myMap.resize();
      this.myMap.setOption(this.myMapOption, true);
      this.detailChart.resize();
      this.elecChart.resize();
      this.envChart.resize();
      this.wastedChart.resize();
      if (document.getElementById('sheetChart')) {
        let sheet_w = parseInt(window.getComputedStyle(document.getElementById('sheetChart')).width.replace('px', ''));
        this.sheetOption.series && (this.sheetOption.series[0].radius = [sheet_w / 10, sheet_w / 10 + 20]);
      }
      this.sheetChart.resize();
      this.sheetChart.setOption(this.sheetOption, true);
      this.operatorChart.resize();
      if (document.getElementById('operatorTypeChart')) {
        let w = parseInt(window.getComputedStyle(document.getElementById('operatorTypeChart')).width.replace('px', ''));
        this.operatorTypeOption.radar && (this.operatorTypeOption.radar[0].radius = w / 2 - 30);
      }
      this.operatorTypeChart.resize();
      this.operatorTypeChart.setOption(this.operatorTypeOption, true);
    });
  },
  methods: {
    initData() {
      // 项目、工单、储能、储热等等总数
      this.$common.$ajax('manage/getProjectSubstationCount', {}, 'get').then(res => {
        this.countData = res.data.value;
      });
      // 获取所有省地区的项目
      this.$common.$ajax('manage/getProjectProvinceList', {}, 'get').then(res => {
        let list = res.data.value || [];
        this.initMap(list);
      });
      // 获取环保减排量数据
      this.$common.$ajax('manage/getEnvironmentalProtectionData', {}, 'get').then(res => {
        let data = res.data.value || {};
        this.initEnvChart([data.so2PerCoal, data.dustPerCoal, data.cPerCoal]);
        this.initWastedChart(data.exhaustPerCoal);
      });
      // 工单分布统计
      this.$common.$ajax('manage/getAllWorkOrderCount', {}, 'get').then(res => {
        let yData = [];
        this.sheetData = res.data.value || {};
        let data = res.data.value || {};
        yData.push({ value: data.hasBeenAssigedCount || 0, name: '待接收' });
        yData.push({ value: data.haveInHandCount || 0, name: '进行中' });
        yData.push({ value: data.waitSureCount || 0, name: '待确认' });
        yData.push({ value: data.alreadyExitCount || 0, name: '已取消' });
        yData.push({ value: data.alreadyComptendCount || 0, name: '已完成' });
        this.initSheetChart(yData);
      });
    },
    showCityBox(val) {
      if (val) {
        document.querySelector('.city-arrow').classList.add('active');
        document.querySelector('.city-arrow').classList.remove('inactive');
      }
      if (!val) {
        document.querySelector('.city-arrow').classList.add('inactive');
        document.querySelector('.city-arrow').classList.remove('active');
      }
      this.cityFlag = !!val;
    },
    selectCity(cityName) {
      this.curProvince = cityName;
      this.cityFlag = false;
      this.getOperation();
    },
    handleTabs(val) {
      if (val == '工单') this.sheetChart.resize();
      if (val == '人员') {
        this.operatorChart.resize();
        this.operatorTypeChart.resize();
        this.getOperation();
      }
    },
    getOperation() {
      // 运维人员统计
      this.$common.$ajax('manage/getProvinceOperationStatistics', { province: this.curProvince }, 'get').then(res => {
        let xData = [],
          yData = [];
        let list = res.data.value || [];
        list.filter(item => {
          xData.push(item.city);
          yData.push(item.totalOpCount || 0);
        });
        this.initOperatorChart(xData, yData);
      });
      this.$common.$ajax('manage/getSelectOpTypeStatistics', {}, 'get').then(res => {
        let yData = [res.data.value.totalOpCount, res.data.value.idleOpCount, res.data.value.temporarilyCount, res.data.value.permanentCount]; // 总人数 空闲 借调 常驻
        this.initOperatorTypeChart(yData);
      });
    },
    backChart() {
      document.getElementById('elec').style.display = 'flex';
      document.getElementById('echartDetail').style.display = 'none';
    },
    initWastedChart(wastedCount) {
      let option = {
        title: {
          text: '废气减排',
          left: 'center',
          bottom: 3,
          textStyle: {
            color: '#666666',
            fontSize: 12,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          show: false,
          trigger: 'item',
          padding: [5, 10],
          formatter: "{a}<br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'left',
          data: ['废气减排']
        },
        color: ['#fd8b72', '#e7e6e6'],
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['60%', '80%'],
          clockwise: false,
          clickable: false,
          silent: true,
          hoverAnimation: false,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: 30
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: wastedCount, name: wastedCount + '\n\nm³', label: { show: true, color: '#666666', padding: [10, 0, 0, 0] } },
            { value: wastedCount / 2 },
          ]
        }]
      };
      this.wastedChart.setOption(option);
    },
    showChart(type) {
      // 获取变电站容量列表统计 1 储能 2能源 3电房
      this.$common.$ajax('manage/getAllSubstationByTypeInfo', {
        type: type
      }, 'get', true).then(res => {
        let xData = [],
          yData = [],
          yData2 = [];
        let list = res.data.value || [];
        if (list.length == 0) return this.$message.error('当前没数据！');
        let unit = ['', 'MW·h', 'MJ', 'kVA'];
        let yAxisName = ['', '(MW·h)', '(MJ)', '(kVA)'];
        list.filter(item => {
          xData.push(item.name);
          if (type == 1) yData.push(item.totalCapacity || 0);
          if (type == 2) {
            yData.push(item.totalHeatStorage || 0);
            yData2.push(item.totalCoolingCapacity || 0);
          }
          if (type == 3) yData.push(item.totalCapacity || 0);
        });
        document.getElementById('elec').style.display = 'none';
        document.getElementById('echartDetail').style.display = 'block';
        this.elecChart.resize();
        let title = '';
        if (type == 1) title = '储能站容量情况';
        if (type == 2) title = '能源站容量情况';
        if (type == 3) title = '配电房容量情况';
        this.initElecChart(xData, yData, yData2, unit[type], yAxisName[type], title, type);
      });
    },
    initMap(list = []) {
      let regionsGeo = [];
      let convertData = () => {
        let res = [];
        list.filter(item => {
          res.push({
            value: item.projectCount,
            ...item
          });
          regionsGeo.push({
            name: item.name,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              emphasis: {
                areaColor: '#1ec094',
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowBlur: 20,
                borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, 1)'
              }
            }
          });
        });
        return res;
      };
      let dom = `<span style="display: inline-block;width: 5px;height: 5px;border-radius: 50%;background: #FD8B72;vertical-align: middle;margin-right: 0;margin-top: -2px;"></span>`;
      this.myMapOption = { // 进行相关配置
        tooltip: {
          trigger: 'item',
          position: 'left',
          confine: true,
          padding: [5, 10],
          formatter: function(params) {
            if (!params.data) return '';
            return `${dom}&nbsp;${params.data.name}<br/>
              &nbsp;&nbsp;项目数量：${params.data.value||0}<br/>
              &nbsp;&nbsp;储能站<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;数量：${params.data.energyStorageCount||0}<span style="font-size:.4rem;"> 座</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;装机容量：${params.data.energyStorageTotalCapacity||0}<span style="font-size:.4rem;"> MW·h</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;装机功率：${params.data.totalPower||0}<span style="font-size:.4rem;"> MW</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;运维人数：${params.data.energyStorageYunWeiCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;常驻运维人数：${params.data.energyStoragePermanentOpCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;借调运维人数：${params.data.energyStorageTemporarilyOpCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;能源站<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;数量：${params.data.heatStorageCount||0}<span style="font-size:.4rem;"> 座</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;供热功率：${params.data.totalHeatPower||0}<span style="font-size:.4rem;"> MW</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;制冷功率：${params.data.totalColdPower||0}<span style="font-size:.4rem;"> MW</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;供热量：${params.data.totalHeatStorage||0}<span style="font-size:.4rem;"> MJ</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;制冷量：${params.data.totalCoolingCapacity||0}<span style="font-size:.4rem;"> MJ</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;运维人数：${params.data.heatYunWeiCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;常驻运维人数：${params.data.heatPermanentOpCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;借调运维人数：${params.data.heatTemporarilyOpCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;配电房<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;数量：${params.data.transformerCount||0}<span style="font-size:.4rem;"> 座</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;装机容量：${params.data.transformerTotalCapacity||0}<span style="font-size:.4rem;"> kVA</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;运维人数：${params.data.dfYunWeiCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;常驻运维人数：${params.data.transformerPermanentOpCount||0}<span style="font-size:.4rem;"> 人</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;借调运维人数：${params.data.transformerTemporarilyOpCount||0}<span style="font-size:.4rem;"> 人</span>`;
          }
        }, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['#1ec094'] // 有值背景色
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true, //是否开启鼠标缩放和平移漫游
          zoom: 1.2,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: '#088764',
                fontSize: 10
              }
            },
            emphasis: {
              textStyle: {
                color: '#088764'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
              color: '#fff' // 地图块背景色
            },
            emphasis: {
              areaColor: '#c3f8e9',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          regions: regionsGeo
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo' // 对应上方配置
        }, {
          name: '启动次数', // 浮动框的标题
          type: 'map',
          geoIndex: 0,
          data: convertData()
        }]
      };
      this.myMap.setOption(this.myMapOption);
      this.myMap.on('click', (params) => { //点击事件
        if (params.data) {
          this.getCityData(params.data.name, params.data.provincePinYin); // 江苏
        }
      });
    },
    getCityData(provice, provincePinYin) {
      this.$common.$ajax('manage/getAllProjectList', {
        province: provice
      }, 'get', true).then(res => {
        document.getElementById('myMap').style.display = 'none';
        document.getElementById('myMapDetail').style.display = 'block';
        this.loadCityMap(res.data.value.list || [], provincePinYin);
      });
    },
    loadCityMap(data, provincePinYin) {
      let cityJson = require(`../../utils/map/json/province/${provincePinYin}.json`);
      this.$echarts.registerMap(provincePinYin, cityJson);
      let regionsGeo = [];
      let convertData = () => {
        let res = [];
        data.filter(item => {
          res.push({
            value: [item.lng, item.lat, item.operationCount],
            ...item
          });
          regionsGeo.push({
            name: item.name,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#1ec094',
                  fontSize: 14,
                  fontWeight: 'bold'
                }
              }
            }
          });
        });
        return res;
      };
      let dom = `<span style="display: inline-block;width: 5px;height: 5px;border-radius: 50%;background: #FD8B72;vertical-align: middle;margin-right: 0;margin-top: -2px;"></span>`;
      let option = {
        tooltip: {
          trigger: 'item',
          padding: [5, 10],
          formatter: function(params) {
            if (!params.data) return '';
            return `${dom}&nbsp;${params.data.name}<br style="display:${params.data.address?'block':'none'}"/>&nbsp;&nbsp;<img style="width:7px;height:9px;float:left;margin-top:6px;margin-right:-5px;display:${params.data.address?'block':'none'}" src="static/icon-map.png" />${params.data.address}<br/>&nbsp;&nbsp;储能电站：${params.data.energyStorageCount || 0} 座<br/>&nbsp;&nbsp;能源厂站：${params.data.heatFactoryCount || 0} 座<br/>&nbsp;&nbsp;配电房：${params.data.transformerCount || 0} 座`;
          }
        },
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['#fd8b71']
        },
        geo: {
          map: provincePinYin, // 动态加载名称
          roam: true,
          zoom: 1.2,
          left: 'center',
          top: 'center',
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#9ac5b9'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
              color: '#fff'
            },
            emphasis: {
              areaColor: '#c3f8e9',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          regions: regionsGeo
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: 20,
          zlevel: 6,
          data: convertData(),
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#fd8b71',
              borderColor: '#fd8b71',
              color: '#fd8b71'
            }
          }
        }]
      };
      this.detailChart.setOption(option, true);
      this.detailChart.on('click', (params) => {
        if (params.data) {
          this.$router.push({ path: '/main/project/detail', query: { id: params.data.id } });
        }
      });
    },
    backMap() {
      document.getElementById('myMapDetail').style.display = 'none';
      document.getElementById('myMap').style.display = 'block';
      this.myMap.resize();
      this.myMap.setOption(this.myMapOption, true);
    },
    initElecChart(xData, yData, yData2, unit, yAxisName, title, type) {
      let option = {
        color: ['#45c48b', '#3398DB'],
        title: {
          text: title,
          top: 0,
          left: 'center',
          textStyle: {
            color: '#323741',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 14
          }
          // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        tooltip: {
          trigger: 'axis',
          padding: [5, 10],
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          /*formatter: function(params) {
            if (type == 2) return `${params[0].name}<br/>供热量：${params[0].data}<span style="font-size: 12px;"> MJ</span><br/>制冷量：${params[1].data}<span style="font-size: 12px;"> MJ</span>`;
            return `${params[0].name}：${params[0].data}<span style="font-size: 12px;"> ${unit}</span>`;
          }*/
        },
        grid: {
          top: '12%',
          left: '10%',
          right: '10%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name: yAxisName,
          type: 'value'
        }],
        dataZoom: [{
          show: true,
          start: 80,
          end: 100
        }, {
          type: 'inside',
          start: 50,
          end: 100
        }, {
          show: false,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 20,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }],
        series: [{
          name: '供热量',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#000'
            }
          },
          data: yData
        }]
      };
      if (type == 2) { // 能源双轴
        option.legend = { data: ['供热量', '制冷量'], right: 39, zlevel: 100 };
        // option.yAxis[1] = {
        //   name: '',
        //   type: 'value'
        // };
        option.series[1] = {
          name: '制冷量',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#000'
            }
          },
          // yAxisIndex: 1,// 双轴
          data: yData2
        };
      }
      this.elecChart.setOption(option, true);
    },
    initEnvChart(yData) {
      let option = {
        tooltip: {
          trigger: 'axis',
          padding: [5, 10],
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['SO2减排', '烟尘减排放', '碳减排放'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name: '(吨)',
          type: 'value'
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: function(params) {
                let colorList = ['#3aa0ff', '#4ecb73', '#ffb980'];
                return colorList[params.dataIndex];
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          data: yData
        }]
      };
      this.envChart.setOption(option);
    },
    initOperatorChart(xData, yData) {
      let option = {
        color: ['#45c48b'],
        tooltip: {
          trigger: 'axis',
          padding: [5, 10],
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '12%',
          left: '10%',
          right: '10%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name: '(人)',
          type: 'value'
        }],
        dataZoom: [{
          show: true,
          start: 10,
          end: 100
        }, {
          type: 'inside',
          start: 50,
          end: 100
        }, {
          show: false,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 20,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#000'
            }
          },
          data: yData
        }]
      };
      this.operatorChart.setOption(option);
    },
    initOperatorTypeChart(yData) {
      /*let option = {
        tooltip: {
          show: true,
          trigger: "item",
          padding: [5, 10],
          backgroundColor: '#fff',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
          formatter: function(params) {
            if (!params.data) return '';
            let sharp1 = `<span style="height:0;width:20px;float:left;border-top:20px solid #149BE7;border-left:10px solid transparent;border-right:10px solid transparent;border-top-right-radius:50%;border-top-left-radius:50%;position:absolute;clip:rect(0px,20px,10px,0px);top:5px;"></span>`;
            let sharp2 = `<span style="height:0;width:20px;float:left;border-top:20px solid #FD8B71;border-left:10px solid transparent;border-right:10px solid transparent;border-top-right-radius:50%;border-top-left-radius:50%;position:absolute;clip:rect(0px,20px,10px,0px);top:5px;"></span>`;
            let sharp3 = `<span style="height:0;width:20px;float:left;border-top:20px solid #1EC094;border-left:10px solid transparent;border-right:10px solid transparent;border-top-right-radius:50%;border-top-left-radius:50%;position:absolute;clip:rect(0px,20px,10px,0px);top:5px;"></span>`;
            let sharp4 = `<span style="height:0;width:20px;float:left;border-top:20px solid #FFB980;border-left:10px solid transparent;border-right:10px solid transparent;border-top-right-radius:50%;border-top-left-radius:50%;position:absolute;clip:rect(0px,20px,10px,0px);top:5px;"></span>`;
            return `<p style="position:relative;">${sharp1}<span style="color:#666;margin-left:25px;">总人数</span><span style="color:#45C48B;margin:0 5px;">${yData[3]}</span><span style="color:#ccc;">人</span></p>
              <p style="position:relative;">${sharp2}<span style="color:#666;margin-left:25px;">常驻</span><span style="color:#45C48B;margin:0 5px;">${yData[2]}</span><span style="color:#ccc;">人</span></p>
              <p style="position:relative;">${sharp3}<span style="color:#666;margin-left:25px;">借调</span><span style="color:#45C48B;margin:0 5px;">${yData[1]}</span><span style="color:#ccc;">人</span></p>
              <p style="position:relative;">${sharp4}<span style="color:#666;margin-left:25px;">空闲</span><span style="color:#45C48B;margin:0 5px;">${yData[0]}</span><span style="color:#ccc;">人</span></p>`;
          }
        },
        angleAxis: {
          show: false,
          startAngle: 90,
          max: 400 // 总人数
        },
        radiusAxis: {
          show: false,
          type: 'category',
          // boundaryGap: false,
          splitArea: {
            show: false,
          },
          data: ['空闲', '借调', '常驻', '总人数'] // 100 200 100 400
        },
        polar: {
          center: ['50%', '50%'],
        },
        series: [{
          type: 'bar',
          barWidth: '100%',
          data: yData,
          coordinateSystem: 'polar',
          color: function(params) {
            let colorList = ['#FFB980', '#1EC094', '#FD8B71', '#149BE7'];
            return colorList[params.dataIndex];
          }
        }]
      };*/
      let w = parseInt(window.getComputedStyle(document.getElementById('operatorTypeChart')).width.replace('px', ''));
      let max = Math.max(...yData);
      this.operatorTypeOption = {
        tooltip: {
          trigger: 'axis',
          padding: [5, 10]
        },
        radar: [{
          indicator: [
            { text: '总人数', max: max },
            { text: '空闲', max: max },
            { text: '借调', max: max },
            { text: '常驻', max: max }
          ],
          center: ['50%', '50%'],
          radius: w / 2 - 30,
          nameGap: 5
        }],
        series: [{
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          lineStyle: {
            color: '#149BE7'
          },
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default',
                color: '#149BE7'
              }
            }
          },
          data: [{
            value: yData,
            name: '运维人员类型',
            itemStyle: {
              normal: {
                color: '#149BE7'
              }
            }
          }]
        }]
      };
      this.operatorTypeChart.setOption(this.operatorTypeOption);
    },
    initSheetChart(yData) {
      let w = parseInt(window.getComputedStyle(document.getElementById('sheetChart')).width.replace('px', ''));
      this.sheetOption = {
        tooltip: {
          trigger: 'item',
          padding: [5, 10]
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'left',
          data: ['待接收', '进行中', '待确认', '已取消', '已完成']
        },
        color: ['#149be7', '#1ec094', '#fb8b71', '#ffb980', '#b6a2de'],
        series: [{
          name: '',
          type: 'pie',
          center: ['50%', '50%'],
          radius: [w / 10, w / 10 + 20],
          data: yData,
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b} : {c}'
              },
              labelLine: { show: true }
            }
          }
        }]
      };
      this.sheetChart.setOption(this.sheetOption);
    }
  }
}
</script>
<style lang="scss" scoped>
.common-animation {
  animation: opacity-animation .5s;
}

.operator-area {
  height: 56px;
  line-height: 56px;
  font-size: .56rem;
  animation: opacity-animation .5s;

  span {
    text-align: center;
    display: inline-block;
    float: left;

    label {
      position: relative;
      height: 17px;
      text-decoration: underline;
      color: #149BE7;
      cursor: pointer;
      margin-right: 10px;
      padding-bottom: 7px;

      i.active {
        transform: rotateZ(180deg);
        animation: rotate-animation .5s;
      }

      i.inactive {
        transform: rotateZ(0deg);
        animation: origin-animation .5s;
      }

      @keyframes rotate-animation {
        from {
          transform: rotateZ(0deg);
        }

        to {
          transform: rotateZ(180deg);
        }
      }

      @keyframes origin-animation {
        from {
          transform: rotateZ(180deg);
        }

        to {
          transform: rotateZ(0deg);
        }
      }

      .city-list {
        position: absolute;
        width: 85px;
        max-height: 199px;
        z-index: 100;
        left: -17px;
        top: -10px;
        margin-top: 34px;
        box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .2);
        background: #fff;
        border-radius: 4px;
        padding: 7px;
        overflow-y: auto;
        overflow-x: hidden;

        .cityName {
          padding: 0 10px;
          line-height: 30px;
          width: auto;
          white-space: nowrap;
          color: #666;
          cursor: pointer;

          &.active {
            color: #149BE7;
          }

          &:hover {
            color: #149BE7;
          }
        }

        &::before {
          position: absolute;
          content: '';
          border-right: 8px solid transparent;
          border-left: 8px solid transparent;
          border-bottom: 8px solid #ccc;
          top: -7px;
          left: 127px;
          opacity: .2;
        }
      }
    }

    &:nth-of-type(1) {
      width: 70%;
    }

    ;

    &:nth-of-type(2) {
      width: 30%;
    }

    ;
  }
}

.hideBack {
  position: absolute;
  right: 10px;
  top: 5px;
  opacity: .5;
  cursor: pointer;
  z-index: 90;

  &:hover {
    opacity: 1;
  }
}

#echartDetail {
  display: none;
  position: relative;
  margin-top: 10px;
  animation: opacity-animation 1s;
}

#myMapDetail {
  display: none;
  position: relative;
  animation: opacity-animation 1s;
}

.row {
  display: flex;
  justify-content: space-between;
  height: 566px;
  margin-bottom: 10px;

  .rowItem {
    position: relative;
    height: 100%;
    width: calc(50% - 5px);
    background: #fff;
    border-radius: 8px;
    box-shadow: 2px 2px 5px 0px #dfdfdf;
    animation: opacity-animation .5s;

    &.map {
      background: url(../../assets/bg-map.png);
      background-size: 100% 100%;
    }

    &.first {
      display: flex;
      flex-direction: column;

      .rowItemText {
        display: flex;
        height: 100px;
        margin-bottom: 10px;

        span {
          position: relative;
          flex: 1;
          display: inline-block;
          font-size: .56rem;
          margin-right: 10px;
          border-radius: 8px;
          background: url('../../assets/left-dot-bg.png') left top no-repeat,
            url('../../assets/right-dot-bg.png') right top no-repeat;

          &:nth-of-type(1) {
            background-color: #149be7;
          }

          &:nth-of-type(2) {
            background-color: #1dc094;
          }

          &:nth-of-type(3) {
            background-color: #fd8b71;
            margin-right: 0;
          }

          img {
            width: 100px;
            height: 100px;
            margin-left: -10px;
          }

          p {
            position: absolute;
            text-align: center;
            line-height: 1.3;
            color: #fff;
            font-weight: bold;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    a {
      position: absolute;
      right: 20px;
      top: 18px;
      color: rgba(0, 0, 0, 0.85);

      &:hover {
        color: #45C48B;
      }
    }

    .title-img {
      float: left;
      margin-top: 16px;
      margin-left: 20px;
    }

    .title {
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid #E9E9E9;
      font-size: .56rem;
      color: #000000;
      opacity: 0.85;
      font-family: MicrosoftYaHei;
      padding-left: 50px;
      font-weight: bold;
    }

    .tabs {
      position: absolute;
      right: 10px;
      top: 14px;
    }

    .echart {
      height: 400px;

      &#envChart {
        width: 60%;
        height: 250px;
      }

      &#wastedChart {
        width: 40%;
        height: 250px;
      }

      &#sheetChart,
      &#operatorChart {
        margin-top: 40px;
        width: 70%;
        height: 250px;
      }

      &#elecChart {
        height: 400px;
      }

      &#myMap,
      &#detailChart {
        height: 510px;
      }

      &.elec {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .circle {
        position: relative;
        width: 33.33%;
        height: 100%;
        cursor: pointer;
        margin-right: 5px;
        color: #999999;

        &:hover {
          opacity: .7;
        }

        &:last-child {
          margin-right: 0;
        }

        b {
          font-size: .8rem;
          color: #323741;
          font-weight: normal;
          text-align: right;
          padding-right: 2px;
        }

        .unit {
          width: 27px;
          text-align: left;
          white-space: nowrap;
        }

        sub {
          font-size: .4rem;
          width: 27px;
          text-align: left;
          white-space: nowrap;
          display: inline-block;
        }

        img {
          position: absolute;
          bottom: 0;
          left: 0;
        }

        p {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 10px;
          font-size: .56rem;

          span {
            white-space: nowrap;
            display: inline-block;
          }
        }

        .type {
          position: absolute;
          font-size: .8rem;
          bottom: 30px;
          text-align: right;
          padding-right: 20px;
          display: block;
          color: #323741;
          font-family: '微软雅黑'
        }

        &:nth-of-type(1) {
          background: linear-gradient(#e6f8eb, #fff);
          border-bottom-left-radius: 8px;
        }

        &:nth-of-type(2) {
          background: linear-gradient(#fef3de, #fff);
        }

        &:nth-of-type(3) {
          background: linear-gradient(#e3f2ff, #fff);
          border-bottom-right-radius: 8px;
        }
      }
    }

    .brief {
      width: 30%;
      text-align: left;
      padding: 57px 0;

      .item {
        font-size: .45rem;
        color: #A6A6A6;
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

        span {
          color: #1ec094;
          font-size: .7rem;
          font-weight: bold;
          width: calc(50% - 19px);
          text-align: center;

          .unit {
            opacity: 0.7;
            font-weight: normal;
          }

          &:nth-of-type(1) {
            color: #666;
            font-size: .48rem;
            width: 38px;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>