import type { ToolContentMap } from "./types";

export const content: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "Nén JPG trực tuyến — Trình nén JPEG miễn phí | Image Shuttle",
    metaDescription:
      "Nén ảnh JPG/JPEG trực tuyến miễn phí. Giảm dung lượng tệp tới 80% với thanh trượt chất lượng — không tải lên, 100% riêng tư, xử lý ngay trong trình duyệt.",
    h1: "Nén ảnh JPG",
    lead: "Giảm dung lượng ảnh JPG/JPEG tới 80% với thanh trượt chất lượng. Miễn phí, nhanh và hoàn toàn riêng tư — mọi thứ chạy trong trình duyệt của bạn, không cần tải lên.",
    steps: [
      { title: "Tải JPG lên", desc: "Kéo và thả các tệp JPG/JPEG vào khu vực tải lên, hoặc nhấp để duyệt. Bạn có thể chọn nhiều tệp cùng lúc." },
      { title: "Chọn chất lượng", desc: "Chọn một cài đặt chất lượng có sẵn hoặc tinh chỉnh thanh trượt, rồi xem trước trước/sau để cân bằng giữa dung lượng và chất lượng." },
      { title: "Tải xuống", desc: "Áp dụng nén và tải ảnh JPG nhỏ hơn của bạn về. Mọi thứ diễn ra cục bộ — ảnh của bạn không bao giờ rời khỏi thiết bị." },
    ],
    faqs: [
      { q: "Ảnh JPG của tôi sẽ nhỏ đi bao nhiêu?", a: "Thường nhỏ hơn 40–80%, tùy vào ảnh và mức chất lượng bạn chọn. Ảnh chi tiết sẽ nén được ít hơn so với đồ họa đơn giản." },
      { q: "Nén có làm giảm chất lượng ảnh không?", a: "Nén JPEG là nén có tổn hao, nhưng ở cài đặt chất lượng cao thì rất khó nhận ra sự khác biệt. Hãy dùng thanh trượt trước/sau để kiểm tra trước khi tải xuống." },
      { q: "Ảnh của tôi có được tải lên máy chủ không?", a: "Không. Mọi thao tác nén đều chạy trong trình duyệt của bạn qua Canvas API, nên ảnh vẫn nằm trên thiết bị của bạn — 100% riêng tư." },
      { q: "Có giới hạn về dung lượng hay số lượng tệp không?", a: "Không có giới hạn ở cấp ứng dụng; chỉ giới hạn bởi bộ nhớ của trình duyệt. Bạn có thể nén hàng loạt nhiều tệp cùng lúc." },
      { q: "Tôi có thể chuyển JPG sang WebP hoặc AVIF thay vào đó không?", a: "Có. Chọn WebP hoặc AVIF làm định dạng đầu ra để có tệp còn nhỏ hơn nữa với chất lượng tương đương." },
    ],
  },
  "compress-png": {
    metaTitle: "Nén PNG trực tuyến — Trình nén PNG miễn phí | Image Shuttle",
    metaDescription:
      "Nén ảnh PNG trực tuyến miễn phí. Giảm dung lượng tệp PNG 30–70% mà vẫn giữ độ trong suốt — không tải lên, 100% riêng tư, nén bằng WebAssembly ngay trong trình duyệt.",
    h1: "Nén ảnh PNG",
    lead: "Giảm dung lượng tệp PNG 30–70% mà vẫn giữ nguyên độ trong suốt. Miễn phí, nhanh và hoàn toàn riêng tư — nhờ WebAssembly chạy trong trình duyệt, không cần tải lên.",
    steps: [
      { title: "Tải PNG lên", desc: "Kéo và thả các tệp PNG hoặc nhấp để duyệt. Hỗ trợ chọn hàng loạt nhiều tệp cùng lúc." },
      { title: "Nén", desc: "Bộ lượng tử hóa WebAssembly giảm bảng màu trong khi vẫn giữ kênh alpha, nên độ trong suốt được bảo toàn." },
      { title: "Tải xuống", desc: "So sánh bằng thanh trượt trước/sau và tải ảnh PNG nhỏ hơn của bạn về. Không có gì được tải lên — mọi thứ chạy cục bộ." },
    ],
    faqs: [
      { q: "Nén PNG có giữ được độ trong suốt không?", a: "Có. Kênh alpha được bảo toàn hoàn toàn, nên các vùng trong suốt và bán trong suốt vẫn giữ nguyên." },
      { q: "Tôi có thể giảm dung lượng PNG bao nhiêu?", a: "Thường là 30–70%, tùy vào nội dung. Đồ họa, logo và ảnh chụp màn hình với ít màu sẽ nén được nhiều nhất." },
      { q: "Nén không tổn hao hay có tổn hao?", a: "Công cụ dùng lượng tử hóa WebAssembly (giảm bảng màu có tổn hao) để tiết kiệm dung lượng lớn mà vẫn giữ ảnh sắc nét về thị giác." },
      { q: "Tệp của tôi có bị tải lên không?", a: "Không. Việc nén diễn ra hoàn toàn trong trình duyệt của bạn, nên ảnh PNG không bao giờ rời khỏi thiết bị." },
      { q: "Tôi có nên dùng WebP cho web thay vào đó không?", a: "Với website, WebP thường nhỏ hơn PNG khoảng 26% ở chất lượng tương đương và cũng hỗ trợ độ trong suốt — bạn cũng có thể chuyển đổi tại đây." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "Chuyển sang WebP trực tuyến — JPG/PNG sang WebP miễn phí | Image Shuttle",
    metaDescription:
      "Chuyển ảnh JPG và PNG sang WebP trực tuyến miễn phí. Nhận tệp nhỏ hơn 25–35% với hỗ trợ độ trong suốt — không tải lên, 100% riêng tư, ngay trong trình duyệt.",
    h1: "Chuyển ảnh sang WebP",
    lead: "Chuyển JPG và PNG sang WebP để có tệp nhỏ hơn 25–35% với hỗ trợ độ trong suốt đầy đủ. Miễn phí, riêng tư và tức thì — ngay trong trình duyệt của bạn.",
    steps: [
      { title: "Tải ảnh lên", desc: "Thả các tệp JPG hoặc PNG vào khu vực tải lên, hoặc nhấp để duyệt. Hỗ trợ nhiều tệp." },
      { title: "Chọn WebP", desc: "Chọn WebP làm định dạng đầu ra và đặt mức chất lượng để cân bằng giữa dung lượng và độ rõ nét." },
      { title: "Tải xuống", desc: "Chuyển đổi và tải các tệp WebP của bạn về. Mọi xử lý đều cục bộ — không có gì được tải lên." },
    ],
    faqs: [
      { q: "Vì sao nên chuyển sang WebP?", a: "Tệp WebP thường nhỏ hơn JPG/PNG 25–35% ở chất lượng tương đương, giúp tăng tốc website và cải thiện Core Web Vitals." },
      { q: "WebP có hỗ trợ độ trong suốt không?", a: "Có, WebP hỗ trợ kênh alpha giống PNG, nên ảnh trong suốt được chuyển đổi một cách sạch sẽ." },
      { q: "Mọi trình duyệt có hỗ trợ WebP không?", a: "Tất cả trình duyệt hiện đại đều hỗ trợ WebP, khiến nó là lựa chọn an toàn để phân phối trên web." },
      { q: "Ảnh của tôi có bị tải lên không?", a: "Không. Việc chuyển đổi chạy trong trình duyệt của bạn qua Canvas API — tệp của bạn luôn riêng tư trên thiết bị." },
      { q: "Tôi có thể chuyển đổi nhiều ảnh cùng lúc không?", a: "Có. Hỗ trợ chuyển đổi hàng loạt với xử lý song song." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "Chuyển sang AVIF trực tuyến — JPG/PNG sang AVIF miễn phí | Image Shuttle",
    metaDescription:
      "Chuyển ảnh sang AVIF trực tuyến miễn phí. Nhận tệp nhỏ hơn tới ~50% so với JPG ở chất lượng tương đương — không tải lên, 100% riêng tư, chạy trong trình duyệt.",
    h1: "Chuyển ảnh sang AVIF",
    lead: "Chuyển JPG và PNG sang AVIF để có tệp nhỏ hơn tới ~50% so với JPG ở chất lượng tương đương. Miễn phí, riêng tư và xử lý hoàn toàn trong trình duyệt của bạn.",
    steps: [
      { title: "Tải ảnh lên", desc: "Kéo và thả các tệp JPG hoặc PNG, hoặc nhấp để duyệt. Có thể chuyển đổi nhiều tệp cùng lúc." },
      { title: "Chọn AVIF", desc: "Chọn AVIF làm định dạng đầu ra và điều chỉnh chất lượng theo nhu cầu của bạn." },
      { title: "Tải xuống", desc: "Chuyển đổi và tải các tệp AVIF của bạn về. Mọi thứ chạy cục bộ — không tải lên." },
    ],
    faqs: [
      { q: "Vì sao nên chọn AVIF?", a: "AVIF cho khả năng nén tốt nhất trong các định dạng web phổ biến — thường nhỏ hơn JPG ~50% ở chất lượng tương đương — lý tưởng cho các trang tải nhanh." },
      { q: "AVIF có hỗ trợ độ trong suốt không?", a: "Có, AVIF hỗ trợ kênh alpha, nên ảnh trong suốt được bảo toàn." },
      { q: "AVIF có được hỗ trợ rộng rãi không?", a: "Tất cả trình duyệt lớn hiện nay đều hỗ trợ AVIF. Với trình duyệt cũ hơn, hãy giữ một bản dự phòng JPG/WebP." },
      { q: "Ảnh của tôi có được gửi tới máy chủ không?", a: "Không. Việc chuyển đổi diễn ra trong trình duyệt của bạn, nên tệp của bạn luôn riêng tư." },
      { q: "Tôi có thể chuyển đổi hàng loạt sang AVIF không?", a: "Có. Chọn nhiều tệp và chuyển đổi chúng song song." },
    ],
  },
  "resize-image": {
    metaTitle: "Thay đổi kích thước ảnh trực tuyến — Chỉnh pixel chính xác miễn phí | Image Shuttle",
    metaDescription:
      "Thay đổi kích thước ảnh trực tuyến miễn phí. Đặt kích thước pixel chính xác hoặc thu phóng theo phần trăm với khóa tỷ lệ khung hình — không tải lên, 100% riêng tư.",
    h1: "Thay đổi kích thước ảnh",
    lead: "Thay đổi kích thước ảnh về đúng số pixel (ví dụ 512×512) hoặc theo phần trăm, với khóa tỷ lệ khung hình. Miễn phí, riêng tư và tức thì ngay trong trình duyệt của bạn.",
    steps: [
      { title: "Tải ảnh lên", desc: "Kéo và thả ảnh của bạn hoặc nhấp để duyệt. Hỗ trợ đầy đủ JPG, PNG, WebP và AVIF." },
      { title: "Đặt kích thước", desc: "Nhập chiều rộng và chiều cao chính xác theo pixel, hoặc thu phóng theo phần trăm. Khóa tỷ lệ khung hình để tránh méo ảnh." },
      { title: "Tải xuống", desc: "Áp dụng và tải ảnh đã thay đổi kích thước của bạn về. Mọi xử lý đều cục bộ — không có gì được tải lên." },
    ],
    faqs: [
      { q: "Tôi có thể thay đổi kích thước về đúng cỡ như 512×512 không?", a: "Có. Nhập chính xác chiều rộng và chiều cao theo pixel và xuất ở đúng kích thước đó." },
      { q: "Thay đổi kích thước có giữ được tỷ lệ khung hình không?", a: "Bật khóa tỷ lệ khung hình và chiều còn lại sẽ tự động điều chỉnh để tránh kéo giãn." },
      { q: "Thay đổi kích thước có làm giảm chất lượng không?", a: "Thu nhỏ vẫn giữ ảnh sắc nét. Phóng to sẽ làm to các pixel sẵn có, nên phóng quá mức có thể trông mờ." },
      { q: "Ảnh của tôi có bị tải lên không?", a: "Không. Việc thay đổi kích thước chạy hoàn toàn trong trình duyệt của bạn — ảnh vẫn nằm trên thiết bị của bạn." },
      { q: "Tôi có thể thay đổi kích thước những định dạng nào?", a: "JPG, PNG, WebP và AVIF. Bạn cũng có thể đổi định dạng đầu ra ngay khi thay đổi kích thước." },
    ],
  },
  "batch-compress": {
    metaTitle: "Nén ảnh hàng loạt trực tuyến — Trình nén số lượng lớn miễn phí | Image Shuttle",
    metaDescription:
      "Nén nhiều ảnh cùng lúc miễn phí. Nén hoặc chuyển đổi hàng chục tệp JPG/PNG/WebP/AVIF song song — không tải lên, 100% riêng tư, ngay trong trình duyệt.",
    h1: "Nén ảnh hàng loạt",
    lead: "Nén hoặc chuyển đổi hàng chục ảnh cùng lúc với xử lý song song. Miễn phí, riêng tư và nhanh — mọi thứ chạy cục bộ trong trình duyệt của bạn.",
    steps: [
      { title: "Tải nhiều ảnh lên", desc: "Kéo và thả cả một thư mục ảnh hoặc chọn nhiều tệp. Hỗ trợ JPG, PNG, WebP và AVIF." },
      { title: "Đặt tùy chọn", desc: "Chọn một mức chất lượng và định dạng đầu ra để áp dụng cho mọi tệp cùng lúc." },
      { title: "Tải tất cả", desc: "Xử lý cả lô song song và tải các ảnh đã nén của bạn về. Không có gì được tải lên." },
    ],
    faqs: [
      { q: "Tôi có thể nén bao nhiêu ảnh cùng lúc?", a: "Không có giới hạn ở cấp ứng dụng — chỉ giới hạn bởi bộ nhớ của trình duyệt. Hàng đợi xử lý các tệp song song trên các nhân CPU của bạn." },
      { q: "Tôi có thể trộn nhiều định dạng trong một lô không?", a: "Có. Bạn có thể thêm JPG, PNG, WebP và AVIF cùng nhau và áp dụng các cài đặt nhất quán cho tất cả." },
      { q: "Tệp của tôi có bị tải lên đâu đó không?", a: "Không. Mọi tệp đều được xử lý trong trình duyệt của bạn, nên ảnh của bạn luôn riêng tư." },
      { q: "Tôi có thể vừa chuyển đổi vừa nén hàng loạt không?", a: "Có. Chọn một định dạng đầu ra (ví dụ WebP) để chuyển đổi mọi tệp ngay khi nén." },
      { q: "Xử lý hàng loạt có làm chậm trình duyệt của tôi không?", a: "Nó dùng Web Workers được tối ưu theo số nhân CPU của bạn, giữ cho giao diện luôn phản hồi mượt mà trong khi xử lý." },
    ],
  },
};
