export const title = '大屏模板';
export const width = 1920;
export const height = 1080;
export const pages:{
  name: string;
  title?: string;
  subPages: {
    name: string;
    title?: string;
  }[];
}[] = [
  {
    name: 'index',
    subPages: [
      {
        name: 'demo',
        title: '示例'
      }
    ]
  }
];