# selling-shoes-project
Selling shoes support system
Cài đặt JAR vào kho lưu trữ Maven cục bộ của bạn như sau:
mvn install:install-file \
   -Dfile=<path-to-file> \
   -DgroupId=<group-id> \
   -DartifactId=<artifact-id> \
   -Dversion=<version> \
   -Dpackaging=<packaging> \
   -DgeneratePom=true

Trường hợp mỗi đề cập đến:

<path-to-file>: đường dẫn đến tệp để tải, ví dụ → c:\kaptcha-2.3.jar

<group-id>: nhóm mà tệp phải được đăng ký theo vd com.google.code

<artifact-id>: tên tạo tác cho tệp, ví dụ → kaptcha

<version>: phiên bản của tệp, ví dụ → 2.3

<packaging>: bao bì của tệp, ví dụ → jar