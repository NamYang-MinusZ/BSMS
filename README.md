# BSMS
Bus Stop Monitoring System (상 타고 싶어!)


## 로그인 페이지 스크린샷

![login](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/loginindex_1.PNG?raw=true)

## 메인 시스템 페이지 스크린샷 (개발중)

![system](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/MainSystem_1.PNG?raw=true)


## 메인 시스템 페이지 스크린샷2 (개발중)

데이터베이스에 버스 정류장 데이터를 가져와서 카드 형태의 컴포넌트로 나열합니다.  
이후 각각의 카드에 이벤트 리스너를 연결하여 아두이노가 전송했던 수치 데이터를 그래프로 확인 할 수 있도록 합니다.  
  
&nbsp; * 연두색 띠 : 일산화탄소 농도가 안정적이며 장치 작동도 양호함.  
&nbsp; * 주홍색 띠 : 일산화탄소 농도가 현 시점에서 비정상적이며 장치 작동은 양호함.  
&nbsp; * 검은색 띠 : 장치와 네트워크 연결 상태가 끊김.   

![system_2](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/MainSystem_2.PNG?raw=true)

## 메인 시스템 페이지 스크린샷3 (개발중)[2018-08-08]

&nbsp; * 구글맵 모듈과 정류장 카드 클릭이벤트에 따른 동적 차트 생성과 삭제 기능을 구현하였습니다.  
&nbsp; * 차트와 카드섹션을 분리하여 집중적으로 볼 수 있게 Height 옵션을 조정하는 애니메이션 기능을 추가하였습니다.  
&nbsp; * 진보적인 사용자 경험을 위해 정류장 카드 조회시 스크롤 End Detection을 만들고 자동 데이터 추가요청 기능을 추가하였습니다.  

![system_3](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/MainSystem_Google_Map_1.PNG?raw=true)

### 차트기능관련 스크린샷 이미지. [2018-08-08]

* 동적 차트 생성  

![Dynamic_Chart_1](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/Dynamic_Chart_1.PNG?raw=true)

* 동적 차트 임시적인 Disabling  

![Dynamic_Chart_Disable_1](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/Dynamic_Chart_Disable_1.PNG?raw=true)

* 동적 차트의 완전한 인스턴스 삭제  

![Dynamic_Chart_Remove_Instance_1](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/Dynamic_Chart_Remove_Instance_1.PNG?raw=true)

 &nbsp;카드의 STATUS 블록의 푸른 테두리가 쳐져 있는 상태를 인스턴스가 생성되어 있는 상태로 보여주고 있습니다. 이 부분을 재클릭 하게 되면 인스턴스 삭제 명령으로 받아들이고 차트를 다시 렌더링 합니다.  

 ### 카드와 차트의 섹션 분할 뷰 스크린샷 이미지. [2018-08-08]

 * VIEW_CHART_ONLY  

 ![View_Chart_Only_1](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/View_Chart_Only_1.PNG?raw=true)

 * VIEW_CHART_ONLY  

 ![View_Card_Only_1](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/View_Card_Only_1.PNG?raw=true)

 * VIEW_BOTH (초기 상태로 돌아오는 기능)  

 ![View_Both_1](https://github.com/NamYang-MinusZ/BSMS/blob/master/public/Samples/View_Both_1.PNG?raw=true)



