import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 256 })
	firstName: string;

	@Column({ length: 256 })
	lastName: string;

	@Column({ length: 2024 })
	email: string;

	@Column({ length: 2024 })
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn({ select: false })
	deletedAt: Date;

	@BeforeInsert()
	beforeInsert() {
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	@BeforeUpdate()
	beforeUpdate() {
		this.updatedAt = new Date();
	}
}
