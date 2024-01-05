/**
 * @description echarts轮播方法返回类型
 * */ 
type echatsCarousel = {
  index: globalThis.Ref<number>
  initEchatsCarousel: (query:initEchatsCarouselQuery) => void
  setIndex: (i: number) => void
}

type initEchatsCarouselQuery = {
  dataLength: number, 
  initIndexValue?: number, 
  autoPlay?: boolean, 
  seriesCount?: number 
}

/**
 * @description echarts 轮播
 * @param {any} chartRef ref
 * @param {number} interval 轮播间隔 ms
 * @param {boolean} select focus or hover
 * @param {boolean} mouse 是否允许鼠标移入
 * @returns {echatsCarousel} 
 * */ 
export const useEchatsCarousel = (chartRef:any, interval:number, select?:boolean, mouse = true):echatsCarousel => {

  // 轮播数据长度
  const dataLength = ref<number>(0);
  // 轮播下标
  const index = ref<number>(0);
  // 初始下标
  const initIndex = ref<number>(0);
  // 图表个数
  const seriesCount = ref<number>(0);
  // 计时轮播
  const timer = ref<any>(null);

  const clearTimer = ():void => {
    clearInterval(timer.value);
    timer.value = null;
  }

  onMounted(() => {
    mouseEvents();
  });
  
  onUnmounted(() => {
    clearTimer();
  });

  /**
   * @description 控制高亮跟提示
   * @param {string} type （highlight：高亮（反：downplay）；showTip：显示提示（反：hideTip））
   * @param {number} dataIndex 数据项的 index
   * */ 
  const dispatchActionChart = (type:string, dataIndex:number):void => {
    for (let i = 0; i < seriesCount.value; i++) {
      chartRef.value?.dispatchAction({
        type: type,
        seriesIndex: i,
        dataIndex: dataIndex
      });
    }
  }

  /**
   * @description 设置轮播
   * */ 
  const setIntervalMyChart = (i?:number):void => {
    clearTimer();
    const intervalFunc = (i?:number) => {
      // 清除高亮跟提示
      dispatchActionChart(select ? "unselect" : "downplay", index.value);
      dispatchActionChart("hideTip", index.value);
      if (i) {
        index.value = i;
      } else {
        if (index.value < (dataLength.value - 1)) {
          // 索引增加
          index.value = index.value + 1;
        } else {
          index.value = initIndex.value;
        }
      }
      // 激活高亮跟提示
      dispatchActionChart(select ? "select" : "highlight", index.value);
      dispatchActionChart("showTip", index.value);
    }
    intervalFunc(i);
    // 每隔 interval 进行一次切换
    timer.value = setInterval(intervalFunc, interval);
  }

  /**
   * @description 鼠标划入
   * */ 
  const mouseEvents = () => {
    chartRef.value.chartEvent('mouseover', (e) => {
      if (mouse) {
        setIndex(e.dataIndex);
      }
    });
    chartRef.value.chartEvent('mouseout', () => {
      // 启动轮播
      if (mouse) {
        setIntervalMyChart();
      }
    });
  }

  /**
   * @description 设置下标
   * */ 
  const setIndex = (i:number):void => {
    setIntervalMyChart(i);
  }

  /**
   * @description 初始化轮播
   * @param {any[]} val 数组列表 用于计算列表长度
   * */ 
  const initEchatsCarousel = (query:initEchatsCarouselQuery):void => {
    query = Object.assign({ initIndexValue: 0, autoPlay: true, seriesCount: 1 }, query);
    initIndex.value = query.initIndexValue;
    seriesCount.value = query.seriesCount;
    dataLength.value = query.dataLength;
    index.value = initIndex.value;
    // 清除高亮跟提示
    for (let i = 0; i < dataLength.value; i++) {
      dispatchActionChart(select ? "unselect" : "downplay", i);
      dispatchActionChart("hideTip", i);
    }
    if (query.autoPlay) {
      setIntervalMyChart();
    } else {
      clearTimer();
    }
  }

  return {
    index,
    initEchatsCarousel,
    setIndex
  }

}