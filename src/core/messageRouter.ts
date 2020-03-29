import TelegramMessage from '../classes/TelegramMessage';
import UseCase from '../interfaces/useCase';
import TelegramMessageType from '../classes/TelegramMessageType';

export default class MessageRouter {
  private useCases: UseCase[] = [];

  registerUseCase(useCase: UseCase): void {
    this.useCases.push(useCase);
  }

  findUseCase(message: TelegramMessage): UseCase {
    if (message.type === TelegramMessageType.LOCATION) {
      // TODO return Michi's use case by name
    }

    // Check if one of the trigger phrases of any use case is included in the message text
    // eslint-disable-next-line no-restricted-syntax
    for (const useCase of this.useCases) {
      if (useCase.triggers.some((phrase) => message.text?.toLowerCase().includes(phrase))) {
        return useCase;
      }
    }

    throw new Error('Invalid use case');
  }
}
