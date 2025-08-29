export const mockCompanies = [
  {
    id: 1,
    username: "techstore",
    password: "123456",
    company: {
      name: "TechStore Madrid",
      email: "contacto@techstore.com",
      phone: "+34 91 123 4567",
      address: "Calle Gran Vía, 28, 28013 Madrid",
      cif: "B12345678",
      sector: "Tecnología",
      employeeCount: 45,
      founded: "2018"
    },
    recentOrders: [
      {
        id: "ORD-2025-001",
        date: "2025-01-15",
        status: "entregado",
        total: 2456.80,
        items: [
          { name: "Monitor 27\" 4K Dell UltraSharp", quantity: 4, price: 549.99 },
          { name: "Teclado Mecánico Logitech MX", quantity: 6, price: 149.99 }
        ]
      },
      {
        id: "ORD-2025-002",
        date: "2025-01-10",
        status: "en_proceso",
        total: 1847.92,
        items: [
          { name: "Impresora Láser HP LaserJet Pro", quantity: 2, price: 299.99 },
          { name: "Router Wi-Fi 6 ASUS AX6000", quantity: 3, price: 349.99 },
          { name: "Webcam Logitech C920 HD Pro", quantity: 8, price: 79.99 }
        ]
      },
      {
        id: "ORD-2024-045",
        date: "2024-12-28",
        status: "entregado",
        total: 3299.85,
        items: [
          { name: "Disco SSD Samsung 970 EVO Plus 1TB", quantity: 15, price: 129.99 },
          { name: "Monitor 27\" 4K Dell UltraSharp", quantity: 3, price: 549.99 }
        ]
      }
    ]
  },
  {
    id: 2,
    username: "digitaloffice",
    password: "password123",
    company: {
      name: "Digital Office Solutions",
      email: "info@digitaloffice.es",
      phone: "+34 93 987 6543",
      address: "Passeig de Gràcia, 101, 08008 Barcelona",
      cif: "B87654321",
      sector: "Consultoría IT",
      employeeCount: 78,
      founded: "2015"
    },
    recentOrders: [
      {
        id: "ORD-2025-003",
        date: "2025-01-12",
        status: "pendiente",
        total: 4250.45,
        items: [
          { name: "Router Wi-Fi 6 ASUS AX6000", quantity: 5, price: 349.99 },
          { name: "Monitor 27\" 4K Dell UltraSharp", quantity: 4, price: 549.99 },
          { name: "Teclado Mecánico Logitech MX", quantity: 10, price: 149.99 }
        ]
      },
      {
        id: "ORD-2024-078",
        date: "2024-12-20",
        status: "entregado",
        total: 1899.90,
        items: [
          { name: "Impresora Láser HP LaserJet Pro", quantity: 3, price: 299.99 },
          { name: "Disco SSD Samsung 970 EVO Plus 1TB", quantity: 8, price: 129.99 }
        ]
      }
    ]
  },
  {
    id: 3,
    username: "innovacorp",
    password: "admin2025",
    company: {
      name: "InnovaCorp Sistemas",
      email: "admin@innovacorp.com",
      phone: "+34 94 456 7890",
      address: "Alameda de Recalde, 27, 48009 Bilbao",
      cif: "B11223344",
      sector: "Software Development",
      employeeCount: 32,
      founded: "2020"
    },
    recentOrders: [
      {
        id: "ORD-2025-004",
        date: "2025-01-08",
        status: "entregado",
        total: 1649.93,
        items: [
          { name: "Webcam Logitech C920 HD Pro", quantity: 12, price: 79.99 },
          { name: "Teclado Mecánico Logitech MX", quantity: 4, price: 149.99 },
          { name: "Disco SSD Samsung 970 EVO Plus 1TB", quantity: 2, price: 129.99 }
        ]
      }
    ]
  }
];

