import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuditLogRepository {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async create(auditLog: AuditLog): Promise<AuditLog> {
    return this.auditLogRepository.save(auditLog);
  }
}
