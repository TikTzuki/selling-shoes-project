```
└── src
    ├── actions
    │   ├── articleActions.js
    │   ├── categoryActions.js
    │   └── userActions.js
    ├── api
    │   ├── apiHandler.js
    │   ├── articleApi.js
    │   ├── categoryApi.js
    │   └── userApi.js
    ├── components
    │   └── ArticleComponent.jsx
    ├── containers
    │   └── ArticleContainer.js
    ├── index.js
    ├── pages
    │   ├── CategoryPage
    │   │   ├── CategoryPageContainer.js
    │   │   └── components
    │   │       └── CategoryPageComponent.jsx
    │   └── HomePage
    │       ├── components
    │       │   ├── ArticleListComponent.jsx
    │       │   ├── CategoryComponent.jsx
    │       │   └── HomePageComponent.jsx
    │       └── HomePageContainer.js
    ├── reducers
    │   ├── articleReducer.js
    │   ├── categoryReducer.js
    │   └── userReducer.js
    ├── routes.js
    ├── store.js
    └── utils
        └── authUtils.js
```
## **assets**
Đây là thư mục chứa các tài nguyên như fonts, icons, ảnh svg hoặc jpg. Tuỳ theo yêu cầu của dự án mà bạn có thể tạo thêm các thư mục con như fonts, icons, images…

## **components**
Thư mục components chứa tất các các components liên quan tới UI của dự án. Các components sẽ không được phép kết nối trực tiếp tới Redux.

Giả sử dự án của bạn gồm các trang như employee, report, user… Thì bạn có thể tạo các thư mục ở trong components. Đồng thời nếu một component bao gồm nhiều components nhỏ hơn thì chúng ta tạo thư mục cho từng component con bên trong.

Mỗi component sẽ có 3 file là index.js, [Tên component].js, [Tên component].scss.

Chẳng hạn chúng ta có component là SearchBox. Thì bên trong thư mục SearchBox chúng ta có 3 file là index.js, SearchBox.js, SearchBox.scss.

File index.js sẽ có nội dung như sau:
> export { default } from './SearchBox';

Như vậy khi cần import component SearchBox thì đường dẫn sẽ ngắn gọn hơn.

> // Ngắn gọn \
> import Searchbox from '../components/Employee/Searchbox';

## **containers**
Thư mục containers chứa các component liên kết tới Redux. Cách tổ chức cũng tương tự thư mục components. Tuy nhiên bạn không cần tạo thư mục cho từng components và chỉ cần tạo một file duy nhất cho mỗi component.

## **config**
Để tiện chuyển switch qua lại giữa một số môi trường, các url .v.v.

## **reducers**
Có lẽ bạn sẽ thắc mắc là tại sao sử dụng Redux nhưng lại không có các thư mục như *actions*, *contants*, *selectors* mà chỉ có duy nhất thư mục reducers ?

Lý do là việc chia ra nhiều thư mục như vậy sẽ làm cho dự án phức tạp một cách không cần thiết. Do vậy thay vì chia ra nhiều file thì chúng ta gộp lại thành một file và phân chia theo module. Phương pháp tổ chức này được gọi là redux ducks. Và đây là cách tổ chức dự án đã được khá nhiều người sử dụng.

Chẳng hạn như employeeList.js, employeeSearch.js, addEmployee.js…

Và mỗi file như vậy sẽ bao gồm tất cả action, constant, selector.

Với cách tổ chức này, khi bạn cần refactor một module nào thì bạn chỉ chỉnh sửa ở một nơi duy nhất. Việc import các contants và actions cũng thuật tiện hơn nhiều.

## **routers**
Thư mục này để chứa file config tất cả router của app. Thay vì config trực tiếp ở file root.js thì chúng ta define sẵn ở đây, để dễ nhìn và có gì thay đổi cũng tìm nhanh tiện hơn.

## **services**
Services là nơi chứa các function để gọi Rest API kết nối tới backend.

## **ultils | common | helpers** 
Thư mục này có thể đổi lại thành ultils hay common gì đó. Vì mục đích thư mục này là define sẵn 1 số function mà app có thể import vào và sử dụng lại. Ví dụ hàm convert ngày tháng, hàm định dạng tiền tệ...
