# API

GET /data?date=yyyy-MM-dd

```json
{
  "temperature": [
    {
      "value": 20.5,
      "timestamp": "09:38"
    },
    {
      "value": 24.2,
      "timestamp": "09:45"
    }
  ],
  "humidity": [
    {
      "value": 50,
      "timestamp": "09:38"
    },
    {
      "value": 43,
      "timestamp": "09:45"
    }
  ],
  "co2": [
    {
      "value": 315,
      "timestamp": "09:38"
    },
    {
      "value": 350,
      "timestamp": "09:45"
    }
  ]
}
```