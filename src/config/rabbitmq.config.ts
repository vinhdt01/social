export const rabbitmqConfig = {
  host: process.env.RABBITMQ_HOST || 'rabbitmq',
  port: parseInt(process.env.RABBITMQ_PORT) || 5672,
  username: process.env.RABBITMQ_USER || 'guest',
  password: process.env.RABBITMQ_PASSWORD || 'guest',
  queue: process.env.RABBITMQ_QUEUE || 'default_queue',
};
