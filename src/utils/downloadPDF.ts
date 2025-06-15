// src/utils/downloadPdf.ts

/**
 * Создает пустой PDF-файл в виде Blob и инициирует его скачивание.
 * Этот метод не создает реальный PDF-документ с содержимым, а только минимально необходимую структуру,
 * чтобы файл был распознан как PDF и имел нужное расширение.
 * @param filename Имя файла для сохранения (по умолчанию 'document.pdf').
 */
export const downloadEmptyPdf = (filename: string = 'document.pdf') => {
  try {
    // Минимальная валидная структура пустого PDF/A документа (версия 1.0)
    // Это просто строка, содержащая основные элементы PDF-файла:
    // - Заголовок (%PDF-...)
    // - Объекты (Catalog, Pages)
    // - Таблица xref (перекрестных ссылок)
    // - Трейлер (ссылка на корневой объект и таблицу xref)
    // - Указатель начала xref (startxref)
    // - Маркер конца файла (%%EOF)
    const pdfContent = '%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 0>>endobj\nxref\n0 3\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\ntrailer<</Size 3/Root 1 0 R>>\nstartxref\n101\n%%EOF';

    // Создаем объект Blob из строки с PDF-содержимым, указывая MIME-тип PDF
    const blob = new Blob([pdfContent], { type: 'application/pdf' });

    // Создаем временный URL для Blob объекта. Этот URL доступен только в текущем сеансе браузера.
    const url = URL.createObjectURL(blob);

    // Создаем временный элемент <a> в DOM (невидимый для пользователя)
    const a = document.createElement('a');
    a.href = url; // Устанавливаем URL Blob как ссылку для скачивания
    a.download = filename; // Устанавливаем желаемое имя файла для скачивания

    // Добавляем временную ссылку в тело документа
    document.body.appendChild(a);

    // Программно эмулируем клик по ссылке, чтобы инициировать скачивание
    a.click();

    // Удаляем временную ссылку из тела документа после начала скачивания
    document.body.removeChild(a);

    // Освобождаем временный URL Blob объекта. Важно делать это для предотвращения утечек памяти.
    URL.revokeObjectURL(url);

  } catch (error) {
    // Если в процессе создания или скачивания произошла ошибка
    console.error('Error downloading PDF:', error); // Выводим ошибку в консоль
    alert('Failed to download the file.'); // Показываем сообщение пользователю
  }
};

// Пример использования (в React-компоненте):
// <button onClick={() => downloadEmptyPdf('Наш_Документ.pdf')}>Скачать PDF</button>