import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async getReadingListItem(id: string): Promise<ReadingListItem> {
    return this.storage
      .read()
      .find((readingListItem) => readingListItem.bookId === id);
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update((list) => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest,
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update((list) => {
      return list.filter((readingListItem) => readingListItem.bookId !== id);
    });
  }

  async markBookAsRead(id: string): Promise<void> {
    this.storage.update((list) => {
      const date = new Date();
      return list.map((readingListItem) =>
        readingListItem.bookId === id
          ? {
              ...readingListItem,
              finished: true,
              finishedDate: date.toISOString(),
            }
          : readingListItem
      );
    });
  }
}
