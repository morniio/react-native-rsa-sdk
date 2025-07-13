
# morni-provider

Morni API Integration for service requests and user operations.

## Installation

```sh
npm install morni-provider
```

## Initialization

```js
import { init } from 'morni-provider';

init({
  token: 'your_token_here',
  baseUrl: 'https://your-api.com',
  language: 'en', // optional, default is 'en'
});
```

## Usage

### Get User Info

```js
import { getUser } from 'morni-provider';

const response = await getUser();
if (response.success) {
  console.log('User:', response.data);
} else {
  console.error('Error:', response.message);
}
```

### Get Services

```js
import { getServices } from 'morni-provider';

const response = await getServices();
if (response.success) {
  console.log('Services:', response.data);
} else {
  console.error('Error:', response.message);
}
```

### Cancel a Service

```js
import { cancelService } from 'morni-provider';

const response = await cancelService(123); // 123 is the service request ID
if (response.success) {
  console.log('Service cancelled');
} else {
  console.error('Error:', response.message);
}
```

### Create a Service

```js
import { createService } from 'morni-provider';

const response = await createService({
  user_id: 1,
  service_id: 2,
  add_on_id: 3,
  pick_up_lat: 24.7136,
  pick_up_lng: 46.6753,
  drop_off_lat: 24.7743, // optional
  drop_off_long: 46.7386, // optional
  pick_up_time: '2025-07-10T10:00:00Z',
  note: 'Handle with care',
});
if (response.success) {
  console.log('Service created');
} else {
  console.error('Error:', response.message);
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
