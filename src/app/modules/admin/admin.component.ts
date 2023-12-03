import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  posts: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  edit: boolean = false;
  editName: string = '';
  editEmail: string = '';
  editRole: string = '';
  editUserID: number = 0;
  searchText: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.postList();
  }

  postList(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        // console.log(response);
        this.posts = response;
        this.posts.forEach((obj: any) => {
          obj.checked = false; // You can set it to true if needed
        });
      },
      error: (error) => {
        alert('Please ensure you have a stable internet connection 📶');
        console.log(error);
      }
    })
  }

  get filteredUsers() {
    return this.posts.filter((post: any) => {
      return (
        post.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        post.email.toLocaleString()
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        post.role
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }


  checkAllCheckBox(ev: any) {
    if (this.posts) {
      console.log(ev);
      this.posts.forEach((x: any) => x.checked = ev.target.checked)
    }
  }

  isAllCheckBoxChecked() {
    if (this.posts) {
      return this.posts.every((p: any) => p.checked);
    }
  }

  deleteUsers(): void {
    const selectedUsers = this.posts.filter((product: any) => product.checked).map((p: any) => p.id);

    console.log(selectedUsers);

    if (selectedUsers && selectedUsers.length > 0) {


      this.posts = this.posts.filter((obj: any) => !selectedUsers.includes(obj.id));

    } else {

    }
  }


  onTableDataChange(event: any) {
    this.page = event;
    // this.postList();
  }

  deleteUser(id: number) {
    this.posts.splice(id, 1);
    console.log('deleteUser');
  }

  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.postList();
  // }

  editUser(id: number) {
    this.edit = true;
    this.editName = this.posts[id].name;
    this.editEmail = this.posts[id].email;
    this.editRole = this.posts[id].role;
    this.editUserID = id;
  }

  updateUser() {
    if (this.editName && this.editEmail && this.editRole) {
      this.posts[this.editUserID].name = this.editName;
      this.posts[this.editUserID].email = this.editEmail;
      this.posts[this.editUserID].role = this.editRole;
      this.edit = false;
    }
  }

}
