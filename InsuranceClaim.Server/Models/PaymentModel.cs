namespace InsuranceClaim.Server.Models
{
    public class PaymentModel
    {
        public int Id { get; set; }
        public double PaymentDamage { get; set; }
        public double PaymentClaimantCost { get; set; }
        public double PaymentDefenceCost { get; set; }
        public string Status { get; set; }

        public Boolean IsInApproval { get; set; }

        public string PaymentType { get; set; }

        public DateTime StatusDate { get; set; }

        //public PaymentModel() { }
    }

    public class AddPaymentRequest
    {
        public int Id { get; set; }
        public double PaymentDamage { get; set; }
        public double PaymentClaimantCost { get; set; }
        public double PaymentDefenceCost { get; set; }
        public string PaymentType { get; set; }
    }
}
