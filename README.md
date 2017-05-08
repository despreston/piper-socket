# piper-socket
websockets server for Balance


### Data-interchange format
Format for sending a new event through piper-sockekt

| Field name | Type   | Description                                             | Example            |
| ---------- | ------ | ------------------------------------------------------- | ------------------ |
| **to**     | string | Who to receive the event? Includes appropriate namespace| 'user:testuser123' |
| **payload**| string | The socket payload. Stringified objects are OK          | "{"hello":"world"}"|
