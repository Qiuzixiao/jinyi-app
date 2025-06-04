/**
 * Next.js 15 类型定义
 * 
 * 在Next.js 15的App Router中，params参数从同步对象变成了Promise对象
 * 所有使用params的页面组件都需要使用await关键字来解构params
 * 并且需要将params的类型定义为Promise<T>
 */

// 通用的动态路由参数类型
export type DynamicRouteParams<T extends Record<string, string | string[]>> = Promise<T>;

// 通用的页面Props类型
export interface PageProps<T extends Record<string, string | string[]> = {}> {
  params: DynamicRouteParams<T>;
  searchParams?: Record<string, string | string[] | undefined>;
}

// 使用示例：
// 
// // 定义路由参数类型
// type ProductParams = {
//   id: string;
// };
// 
// // 使用通用PageProps类型
// export default async function ProductPage({ params }: PageProps<ProductParams>) {
//   // 使用await解构params
//   const { id } = await params;
//   // ...
// }