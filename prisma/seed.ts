import { PrismaClient, InvoiceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { error } from 'console';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando população do banco de dados...')

  const password = await bcrypt.hash('password', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@ElementInternals.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@email.com',
      password: password
    }
  })

  console.log(`Usuário criado: ${user.email}`);

  const customers_data = [{
    name: 'José Mateus',
    email: 'josemateus@gmail.com',
    imageUrl: 'https://ui-avatars.com/api/?name=Jose+Mateus&background=random'
  }, {
    name: 'John Sena',
    email: 'john@email.com',
    imageUrl: 'https://ui-avatars.com/api/?name=John+Sena&background=random'
  }]

  const customers = [];

  for (const data of customers_data) {
    const customer = await prisma.customer.upsert({
      where: { email: data.email },
      update: {},
      create: data
    });

    customers.push(customer);

    console.log(`Cliente criado: ${customer.name}`);
  };

  const invoices_data = [{
    amount: 15500,
    status: InvoiceStatus.PAGO,
    data: '2026-05-15',
    customer: customers[0]
  }, {
    amount: 18500,
    status: InvoiceStatus.PENDENTE,
    data: '2026-08-11',
    customer: customers[1]
  }, {
    amount: 5500,
    status: InvoiceStatus.PENDENTE,
    data: '2026-08-28',
    customer: customers[0]
  }, {
    amount: 1500,
    status: InvoiceStatus.PENDENTE,
    data: '2026-10-10',
    customer: customers[1]
  }, {
    amount: 500,
    status: InvoiceStatus.PAGO,
    data: '2026-10-15',
    customer: customers[0]
  }, {
    amount: 550,
    status: InvoiceStatus.PAGO,
    data: '2026-09-17',
    customer: customers[1]
  }, {
    amount: 155,
    status: InvoiceStatus.PENDENTE,
    data: '2026-05-30',
    customer: customers[1]
  }, {
    amount: 150,
    status: InvoiceStatus.PAGO,
    data: '2026-12-25',
    customer: customers[1]
  }, {
    amount: 957,
    status: InvoiceStatus.PAGO,
    data: '2026-12-31',
    customer: customers[1]
  }, {
    amount: 1900,
    status: InvoiceStatus.PAGO,
    data: '2026-08-30',
    customer: customers[1]
  }, {
    amount: 2000,
    status: InvoiceStatus.PENDENTE,
    data: '2026-07-15',
    customer: customers[0]
  }, {
    amount: 2500,
    status: InvoiceStatus.PENDENTE,
    data: '2026-10-25',
    customer: customers[1]
  }];

  for (const invoice of invoices_data) {
    await prisma.invoice.create({
      data: {
        amount: invoice.amount,
        status: invoice.status,
        date: new Date(invoice.data),
        customerId: invoice.customer.id
      }
    });
  }

  console.log(`${invoices_data.length} faturas criadas.`);

  const revenue_data = [{
    month: 'Jan',
    revenue: 966664656
  }, {
    month: 'Fev',
    revenue: 786664656
  }, {
    month: 'Mar',
    revenue: 986664656
  }, {
    month: 'Abr',
    revenue: 956664656
  }, {
    month: 'Mai',
    revenue: 476664656
  }, {
    month: 'Jun',
    revenue: 586664656
  }, {
    month: 'Jul',
    revenue: 466664656
  }, {
    month: 'Ago',
    revenue: 366664656
  }, {
    month: 'Set',
    revenue: 566664656
  }, {
    month: 'Out',
    revenue: 866664656
  }, {
    month: 'Nov',
    revenue: 766664656
  }, {
    month: 'Dez',
    revenue: 996664656
  }];

  for (const data of revenue_data) {
    await prisma.revenue.upsert({
      where: { month: data.month },
      update: { revenue: data.revenue },
      create: data
    });
  };

  console.log('Dados da receita mensal criados.');

  console.log('População concluida com sucesso.');
};

main()
  .catch((error) => {
    console.log('Erro ao popular o banco de dados:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
