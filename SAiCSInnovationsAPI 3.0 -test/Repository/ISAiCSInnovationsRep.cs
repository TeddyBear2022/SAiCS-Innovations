using SAiCSInnovationsAPI_3._0.Models;
using SAiCSInnovationsAPI_3._0.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Repository
{
    public interface ISAiCSInnovationsRep
    {
        //Teddys interface repository code
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        //object Find<T>(T entity) where T : class;
        void DontModify<T>(T entity) where T : class;
        public bool SaveChanges();
        abstract object FindFAQ(int entityid);
        abstract object getAllFAQs();
        void Emails(string email, string username, string password, int usertype);
        bool RegisterUser(RegisterVM registration);
        object GetAllAdmins();
        object GetAllAmbassadors();
        object GetAllClients();
        //bool Login(LoginVM logindetails);
        object getUserSessionInfo(LoginVM logindetails);
        object GetTitles();
        object GetCountry();
        object GetUserRoles();
        object GetAmbassadorTypes();
        object FindFeedback(int id);

        //object GetProductFeedbacks();
        //object GetAmbassadorFeedbacks();
        //object GetAccountFAQs();
        //object GetProductFAQs();
        //object GetDeliveryFAQs();
        object MyAmbassador(int id);
        //object GetCatalogByCategory(int id);
        object GetFAQCategories();
        //bool RegisterClient(RegisterVM registration);
        //bool updateFAQ(Faq faq);

        //Iteration 06
        object FindRefferalLink(string refferalCode);
        object ViewCurrentAgents(string userID);
        object ViewClient(string userID);
        bool RequestRankingPromotion(string userID);
        bool RequestRankingDemotion(string userID);
        object ViewAmbassadorFeedback(string userID);
        object SearchAmbassador(string name, string surname);


        object GenerateRefferralCode(string name, string surname);
        object GenerateToken(User user);
        bool CheckPassword(string userid, string password);

        object GetUserAddress(string id);
        object AddUserAddress(Address address);

        //Amandas interface repository code
        //Amanda changes
        //CRUD Merch
        object CreateMerch(MerchVM merch);
        object UpdateMerch(int id, MerchVM merch);
        object DeleteMerch(int id);
        object GetAllMerch();
        object GetMerchById(int id);
        object AmbassadorDiscount(string id);
        object GetVAT();


        //Amanda Iteration 6
        //Generic function
        T FindById<T>(int id) where T : class;
        IEnumerable<T> Search<T>(Expression<Func<T, bool>> predicate) where T : class;
        List<T> GetAll<T>() where T : class;

        //Cart functions
        //object ViewCatalog();
        object AddToCart(string id, CartItem cartitem);
        object RemoveFromCart(int itemID);
        object ClearCart(int cartID);
        //object ViewAmbassadorCart();
        //object ViewClientCart();
        object Checkout(Order checkout);
        object loadCart(string id);
        object increaseCartItem(int id);
        object decreaseCartItem(int id);
        object ViewOrderHistory(string userID);
        //object ViewOrderDetails(int orderID);

        //Training Subsystem
        object AssignCourse(int userID);

        //Iteration 7
        // Amanda
        object GetProductList();
        object AmbassadorListRep();
        object SalesRep();

        //Iteration 8 
        //Amanda
        object GetSpecialOptions();


    }
}
