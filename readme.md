# 내일배움캠프 5주차 개인 프로젝트

## 클라이언트와 서버 통신하기

이 프로젝트는 클라이언트와 서버가 패킷을 주고 받는 구조로 되어있다.

### 디렉토리 구조

    .
    ├── assets
    │   ├── item.json
    │   ├── item_unlock.json
    │   └── stage.json
    ├── clients
    ├── package-lock.json
    ├── package.json
    ├── readme.md
    └── src
    ├── classes // 인스턴스 class 들을 정의
    │   ├── managers
    │   └── models
    ├── config // 환경변수, DB 설정등을 선언
    ├── constants // 상수 관리
    ├── db // db 로직 관리
    │   ├── game
    │   ├── migrations
    │   ├── seeders
    │   ├── sql
    │   └── user
    ├── events // socket 이벤트
    ├── handlers // 핸들러 관리
    │   ├── game
    │   └── user
    ├── init // 서버 초기화
    ├── protobuf // 패킷 구조
    │   ├── notification
    │   ├── request
    │   └── response
    ├── session // 세션 관리
    └── utils // 그 외 필요한 함수들 선언
    ├── db
    ├── error
    ├── notification
    ├── parser
    └── response

### 사용한 패키지

    dotenv
    lodash
    long
    mysql2
    protobufjs
    uuid
    
### 프로토콜 버퍼

서버에서 클라이언트 양식에 맞춰 프로토 파일을 만들어 패킷으로 클라이언트에 정보를 보낸다.

### 클라이언트 패킷 구조

#### Common

    [ProtoContract]
    public class CommonPacket
    {
    [ProtoMember(1)]
    public uint handlerId { get; set; }

        [ProtoMember(2)]
        public string userId { get; set; }

        [ProtoMember(3)]
        public string version { get; set; }

        [ProtoMember(4)]
        public byte[] payload { get; set; }

    }

#### InitialPayload

    [ProtoContract]
    public class InitialPayload
    {
    [ProtoMember(1, IsRequired = true)]
    public string deviceId { get; set; }
    
        [ProtoMember(2, IsRequired = true)]
        public uint playerId { get; set; }

        [ProtoMember(3, IsRequired = true)]
        public float latency { get; set; }

    }

#### LocationUpdatePayload

    [ProtoContract]
    public class LocationUpdatePayload {
    [ProtoMember(1, IsRequired = true)]
    public float x { get; set; }
    [ProtoMember(2, IsRequired = true)]
    public float y { get; set; }
    }

#### LocationUpdate

    [ProtoContract]
    public class LocationUpdate
    {
    [ProtoMember(1)]
    public List UserLocation users { get; set; }

        [ProtoContract]
        public class UserLocation
        {
            [ProtoMember(1)]
            public string id { get; set; }

            [ProtoMember(2)]
            public uint playerId { get; set; }

            [ProtoMember(3)]
            public float x { get; set; }

            [ProtoMember(4)]
            public float y { get; set; }
        }

    }

#### Response

    [ProtoContract]
    public class Response {
    [ProtoMember(1)]
    public uint handlerId { get; set; }

        [ProtoMember(2)]
        public uint responseCode { get; set; }

        [ProtoMember(3)]
        public long timestamp { get; set; }

        [ProtoMember(4)]
        public byte[] data { get; set; }

    }

    // 패킷 타입
    public enum PacketType { Ping, Normal, Location = 3 }
    // 핸들러 아이디
    public enum HandlerIds {
    Init = 0,
    LocationUpdate = 2
    }
